# Infisical Variable Injector

## Introduction
This script facilitates the retrieval of variables from Infisical, whether it's on the cloud or self-hosted, and replaces them in a designated file. It requires a mapping file specifying the variables to search for, associated variable names, and the name of the final file with replaced variable values.

## Prerequisites
- Necessary permissions to retrieve secrets from Infisical

## Considerations
1. **Setup Infisical Client Credentials**:
   - Obtain the client ID and client secret from Infisical, more information can be found [here](https://infisical.com/docs/documentation/platform/identities/universal-auth).
   - Set up the Infisical API URL. By default, `https://api.infisical.com`.

2. **Prepare Mapping File**:
   - Create a file specifying the variables to search for and their associated names, for example
  
  ```env
  # Mapping file
  DATABASE_HOST=${INFISICAL_SECRET_DATABASE_HOST}
  DATABASE_PORT=${INFISICALFOLDER/INFISICAL_SECRET_DATABASE_PORT}
  ```

3. **Output**:
   - The script will replace the variables and creates in the designated file with their corresponding values retrieved from Infisical.

## How to use

```yaml
    - name: Getting variables from Infisical
      uses: infisical/infisical-variable-injector@main
      with:
        env_file_path: .pre_env
        infisical_client_id: YOUR_INFISICAL_CLIENT_ID
        infisical_client_secret: YOUR_INFISICAL_CLIENT_SECRET
        infisical_api_url: YOUR_INFISICAL_API_URL //Only if you are using self-hosted Infisical
        infisical_project_id: YOUR_INFISICAL_PROJECT_ID
        infisical_env: THE ENVIRONMENT YOU WANT TO GET VARIABLES FROM
        infisical_env_file: 
```

## Inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `env_file_path` | Path to the mapping file | true | - |
| `infisical_client_id` | Infisical client ID | true | - |
| `infisical_client_secret` | Infisical client secret | true | - |
| `infisical_api_url` | Infisical API URL | false | `https://api.infisical.com` |
| `infisical_project_id` | Infisical project ID | true | - |
| `infisical_env` | Infisical environment | true | - |
| `infisical_env_file` | Path to the file where the variables will be replaced | false | `.env` |

## Outputs

This action will replace the variables and creates in the designated file with their corresponding values retrieved from Infisical.

## License

This project is distributed under the [Mozilla Public License 2.0](LICENSE).