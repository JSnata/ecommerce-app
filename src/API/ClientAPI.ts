import { CustomerDraft } from '@commercetools/platform-sdk';
import { getApiRoot } from './root/BuildClient';
import { ICustomerCreateData } from '../types/CustomerTypes';

/**
 * Retrieves the API root for the authenticated client.
 * Needs to manage the project and all data
 */
export const apiRoot = getApiRoot();
/**
 * Retrieves store data from the API.
 * @returns {Promise<any>} A Promise that resolves with the store data if successful, or null if there was an error.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStoreData = async () => {
  try {
    const response = await apiRoot.stores().get().execute();
    return response.body;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
};

/**
 * Creates a new customer with the provided data.
 * @param {ICustomerCreateData} data - The data for creating the customer.
 * @returns {Promise<CustomerDraft | null>} A Promise that resolves with the created customer or null if there was an error.
 */
export const createCustomer = async (data: ICustomerCreateData): Promise<CustomerDraft | null> => {
  try {
    // const customerNumber = await getCustomerNumber();
    const response = await apiRoot
      .customers()
      .post({
        body: {
          ...data,
          isEmailVerified: true,
        },
      })
      .execute();
    return response.body.customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
};
