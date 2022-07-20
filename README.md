# Requirements
* `npm install @opentelemetry/sdk-trace-node`
* `npm install --save @dynatrace/opentelemetry-gcf`
* `npm install @google-cloud/functions-framework`: this package is used to be able to test the function locally
# Testing locally

For running locally, use `npm run start` . This whill start a local server at a given port.

## Environment variables

These environment variables are needed even if running locally.

```
$Env:DT_TENANT="<tenant>"
$Env:DT_CLUSTER_ID="<cluster id>"
$Env:DT_CONNECTION_BASE_URL="<base url>"
$Env:DT_CONNECTION_AUTH_TOKEN="<token>"
```
