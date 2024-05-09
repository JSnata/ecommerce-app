import fetch from 'node-fetch';
import { AnonymousAuthMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY!;
const options: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID!,
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET!,
  },
  scopes: [
    `view_published_products:${projectKey}`,
    `manage_my_orders:${projectKey}`,
    `manage_my_profile:${projectKey}`,
    `view_categories:${projectKey}`,
  ],
  fetch,
};

const httpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const user = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// eslint-disable-next-line import/prefer-default-export
export const getApiUser = () => {
  return createApiBuilderFromCtpClient(user).withProjectKey({ projectKey });
};
