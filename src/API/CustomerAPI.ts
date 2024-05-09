import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import getApiCustomer from './root/BuildCustomer';

/**
 * Retrieves the API root for the authenticated Customer..
 */
let apiCustomer: ByProjectKeyRequestBuilder;
/**
 * Signs in a customer with the provided email and password.
 * @param {string} username - The email/username of the customer.
 * @param {string} password - The password of the customer.
 * @returns {Promise<void>} A Promise that resolves when the customer is signed in successfully.
 */
export const signingCustomer = async (username: string, password: string) => {
  if (!apiCustomer) {
    console.error('Could not find the API user');
    apiCustomer = getApiCustomer(username, password);
  }
  try {
    const response = await apiCustomer
      .me()
      .login()
      .post({
        body: {
          email: username,
          password,
        },
      })
      .execute();
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCustomerApi = () => {
  if (apiCustomer) {
    return apiCustomer;
  }
  return null;
};
