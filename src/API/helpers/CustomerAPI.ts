import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiCustomer } from '../root/BuildCustomer';

/**
 * Signs in a customer with the provided email and password.
 * @param {string} username - The email/username of the customer.
 * @param {string} password - The password of the customer.
 * @returns {Promise<void>} A Promise that resolves when the customer is signed in successfully.
 */
const signingCustomer = async (username: string, password: string): Promise<ByProjectKeyRequestBuilder | undefined> => {
  const apiCustomer = createApiCustomer(username, password);
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
    if (response.statusCode === 200) {
      return apiCustomer;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
  return apiCustomer;
};
export default signingCustomer;
