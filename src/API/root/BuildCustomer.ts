import fetch from 'node-fetch';
import { ClientBuilder, PasswordAuthMiddlewareOptions, TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY!;
export const userTokenCache: TokenCache = {
  get: () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const tokenStore: TokenStore = JSON.parse(tokenString);
      if (tokenStore.expirationTime > Date.now()) {
        return tokenStore;
      }
      localStorage.removeItem('token');
    }
    return { token: '', expirationTime: 0 };
  },
  set: (cache) => {
    localStorage.setItem('token', JSON.stringify(cache));
  },
};
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
    tokenCache: userTokenCache,
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

export const createApiCustomer = (username: string, password: string) => {
  return createApiBuilderFromCtpClient(createNewCustomer(username, password)).withProjectKey({ projectKey });
};
