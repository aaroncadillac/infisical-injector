const core = require('@actions/core');
const { InfisicalClient } = require('@infisical/sdk');
const fs = require('fs');

function getVarsPathFromFile(filename) {
  const envFile = fs.readFileSync(filename, 'utf8');
  const envMap = {};
  const envVarPaths = envFile.match(/\$\{([^\}]+)\}/g);
  
  envVarPaths.map((envVarEscape) => ({
    name: envVarEscape,
    path: /[^\$\{\}]+/.exec(envVarEscape).toString()
  }));

  return envMap;
}

async function getSecretsFromInfisical(envMap, clientId, clientSecret, env, projectId, siteUrl) {
  console.log('Setting up Infisical client')

  const infisicalClient = new InfisicalClient({
    clientId,
    clientSecret,
    siteUrl,
  });

  await envMap.forEach( async varObject => {
    const envValue = await infisicalClient.getSecret({
      environment: env,
      projectId,
      path: (splittedPath = varObject.path.split('/')).length > 1 ? splittedPath[0] : '/',
      type: "shared",
      secretName: splittedPath.length > 1 ? splittedPath[1] : splittedPath[0]
    });

    varObject.value = envValue;
  })

  return envMap;
}

function replaceVarsInFile(envMap, filename, fileOutputPath) {
  let fileContent = fs.readFileSync(filename, 'utf8');
  envMap.forEach((envVar) => {
    fileContent = fileContent.replace(envVar.name, envVar.value);
  });
  fs.writeFileSync(fileOutputPath, fileContent);
}

async function main() {
  try {
    const envFilePath = core.getInput('env_file_path');
    const clientId = core.getInput('infisical_client_id');
    const clientSecret = core.getInput('infisical_client_secret');
    const apiURL = core.getInput('infisical_api_url');
    const env = core.getInput('infisical_env');
    const projectId = core.getInput('infisical_project_id');
    const outputEnvFile = core.getInput('infisical_env_file');
  
    let envMap = getVarsPathFromFile(envFilePath);
    envMap = await getSecretsFromInfisical(envMap, clientId, clientSecret, env, projectId, apiURL);
    replaceVarsInFile(envMap, envFilePath, outputEnvFile);

  } catch (error) {
    core.setFailed(error.message);
  }
}

main();


