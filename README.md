# Requirements
* `npm install @opentelemetry/sdk-trace-node`
* `npm install --save @dynatrace/opentelemetry-gcf`
* `npm install @google-cloud/functions-framework`: this package is used to be able to test the function locally
# Testing locally

For running locally, use:

 `npm run start`

This will start a local server at a given port.

![prioli-gcf-2](img/npm%20run%20start%20example.png)

## Environment variables

I'm using environment variables to configure monitoring. These environment variables are needed even if running locally.

```
$Env:DT_TENANT="<tenant>"
$Env:DT_CLUSTER_ID="<cluster id>"
$Env:DT_CONNECTION_BASE_URL="<base url>"
$Env:DT_CONNECTION_AUTH_TOKEN="<token>"
```

In the Google Cloud Console, you would specify them in the ["Runtime environment variables"](https://www.dynatrace.com/support/help/shortlink/monitor-gcf-otel#choose-a-configuration-method) section.

# Deploy

For deploying this code you would need to create a new Cloud Function. Here are some parameters I used:
- "1st gen" environment.
- Node.js 16
- Cloud Source repository. So just pushing the code to that repo and redeploying. Deployment command would look something like
`gcloud functions deploy <your function name> --source https://source.developers.google.com/projects/<your project>/repos/<your repo>/moveable-aliases/<branch name>/paths/<path> --runtime nodejs16`. [Reference](https://cloud.google.com/functions/docs/deploying/repo#deploy_using_the_gcloud_tool). Note: in my experience the deployment takes a long time.

# Next steps

If I had more time to work on this I would:
* add more spans
* add external HTTP calls
* try the other monitoring configuration method with JSON file
