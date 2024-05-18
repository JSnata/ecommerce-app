import { ClientBuilder, ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY!;

const httpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

const BuildCustomerWithKey = (token: string) => {
  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(`Bearer ${token}`, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const createApiCustomerWithKey = (token: string) => {
  return createApiBuilderFromCtpClient(BuildCustomerWithKey(token)).withProjectKey({ projectKey });
};
export default BuildCustomerWithKey;
