import fetch from 'node-fetch';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY!;
const createOptions = (username: string, password: string): PasswordAuthMiddlewareOptions => {
  return {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CTP_CLIENT_ID!,
      clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET!,
      user: {
        username,
        password,
      },
    },
    scopes: [
      `view_published_products:${projectKey}`,
      `manage_my_orders:${projectKey}`,
      `manage_my_profile:${projectKey}`,
      `view_categories:${projectKey}`,
    ],
    fetch,
  };
};

const httpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const createNewCustomer = (username: string, password: string) => {
  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(createOptions(username, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};
// eslint-disable-next-line import/prefer-default-export
const getApiCustomer = (username: string, password: string) => {
  return createApiBuilderFromCtpClient(createNewCustomer(username, password)).withProjectKey({ projectKey });
};

export default getApiCustomer;
