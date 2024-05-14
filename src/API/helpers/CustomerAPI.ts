// import { useState } from 'react';
import { toast } from 'react-toastify';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiCustomer } from '../root/BuildCustomer';
/**
 * Signs in a customer with the provided email and password.
 *
 * @param {string} username - The email/username of the customer.
 * @param {string} password - The password of the customer.
 * @returns {Promise<ByProjectKeyRequestBuilder | undefined>} A Promise that resolves with the API customer instance if the login is successful,
 * or `undefined` if there is an error during the login process.
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
      toast.success('Succesfully logged in!');
      return apiCustomer;
    }
  } catch (err) {
    toast.error(`${err}`);
    console.error(err);
    return undefined;
  }
  return apiCustomer;
};
export default signingCustomer;
