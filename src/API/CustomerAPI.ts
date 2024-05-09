import { getApiUser } from './root/BuildUser';

/**
 * Retrieves the API root for the authenticated user..
 */
const apiUser = getApiUser();

/**
 * Signs in a customer with the provided email and password.
 * @param {string} email - The email of the customer.
 * @param {string} password - The password of the customer.
 * @returns {Promise<void>} A Promise that resolves when the customer is signed in successfully.
 */
export const signingCustomer = async (email: string, password: string) => {
  // apiUser = getApiUser(password, email);
  try {
    const response = await apiUser
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default signingCustomer;
