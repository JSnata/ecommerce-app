import { CustomerDraft } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { ICustomerCreateData } from '../../types/CustomerTypes';
import createApiRoot from '../root/BuildClient';

/**
 * Retrieves the API root for the authenticated client.
 * Needs to manage the project and all data
 */
export const apiRoot = createApiRoot();

/**
 * Creates a new customer with the provided data.
 *
 * @param {ICustomerCreateData} data - The data for creating the customer.
 * @returns {Promise<CustomerDraft | null>} A Promise that resolves with the created customer or null if there was an error.
 *
 * @remarks
 * This function uses the authenticated client to create a new customer.
 * It sets the `isEmailVerified` field to `true` by default.
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
    if (response.statusCode === 200) {
      toast.success('Registration successful!');
    }
    return response.body.customer;
  } catch (error) {
    toast.error(`Something went wrong: (${error})`);
    console.error('Error creating customer:', error);
    return null;
  }
};
