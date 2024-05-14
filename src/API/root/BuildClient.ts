import fetch from 'node-fetch';
import { AuthMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.REACT_APP_API_PROJECT_KEY!;
const options: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_API_CLIENT_ID!,
    clientSecret: process.env.REACT_APP_API_CLIENT_SECRET!,
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

const httpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const createApiRoot = () => {
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

export default createApiRoot;
