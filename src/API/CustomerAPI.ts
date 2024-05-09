import { CustomerDraft } from '@commercetools/platform-sdk';
import { getApiUser } from './root/BuildUser';
import { ICustomerCreateData } from '../types/CustomerTypes';

const apiUser = getApiUser();
export const signinCustomer = async (email: string, password: string) => {
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
const getCustomerNumber = async () => {
  try {
    const response = await apiUser.customers().get().execute();
    return (response.body.count + 1).toString();
  } catch (error) {
    console.error('Error get customer number:', error);
    return '';
  }
};

export const createCustomer = async (data: ICustomerCreateData): Promise<CustomerDraft | null> => {
  try {
    const customerNumber = await getCustomerNumber();
    const response = await apiUser
      .customers()
      .post({
        body: {
          stores: [{ typeId: 'store', id: '59ad2c93-402f-4af9-9728-d9a2c65f6e86' }],
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
