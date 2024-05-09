import { CustomerDraft } from '@commercetools/platform-sdk';
import { getApiUser } from './root/BuildUser';
import { ICustomerCreateData } from '../types/CustomerTypes';

/**
 * Retrieves the API root for the authenticated user..
 */
export const apiUser = getApiUser();
/**
 * Retrieves the Current Store ID
 */
const storeId = '59ad2c93-402f-4af9-9728-d9a2c65f6e86';

/**
 * Signs in a customer with the provided email and password.
 * @param {string} email - The email of the customer.
 * @param {string} password - The password of the customer.
 * @returns {Promise<void>} A Promise that resolves when the customer is signed in successfully.
 */
export const signingCustomer = async (email: string, password: string) => {
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
      .clientRequest();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gets the next available customer number.
 * @returns {Promise<string>} A Promise that resolves with the next available customer number.
 */
const getCustomerNumber = async () => {
  try {
    const response = await apiUser.customers().get().execute();
    return (response.body.count + 1).toString();
  } catch (error) {
    console.error('Error get customer number:', error);
    return '';
  }
};

/**
 * Creates a new customer with the provided data.
 * @param {ICustomerCreateData} data - The data for creating the customer.
 * @returns {Promise<CustomerDraft | null>} A Promise that resolves with the created customer or null if there was an error.
 */
export const createCustomer = async (data: ICustomerCreateData): Promise<CustomerDraft | null> => {
  try {
    const customerNumber = await getCustomerNumber();
    const response = await apiUser
      .customers()
      .post({
        body: {
          stores: [{ typeId: 'store', id: storeId }],
          ...data,
          customerNumber,
        },
      })
      .execute();
    return response.body.customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
};
