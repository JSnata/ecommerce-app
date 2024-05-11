import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { AxiosInstance } from 'axios';
import signingCustomer from './helpers/CustomerAPI';
import { ICustomerCreateData } from '../types/CustomerTypes';
import { createCustomer } from './helpers/ClientAPI';
import createAxiosInstance from './helpers/axiosInstance';

export default class ApiService {
  static userApi: ByProjectKeyRequestBuilder | undefined = undefined;

  static axiosInstance: AxiosInstance;

  static async login(email: string, password: string) {
    try {
      this.userApi = await signingCustomer(email, password);
      this.axiosInstance = createAxiosInstance();
    } catch (err) {
      console.error(err);
    }
  }

  static async register(data: ICustomerCreateData) {
    try {
      await createCustomer({ ...data });
    } catch (err) {
      console.error(err);
    }
  }

  static async getProducts() {
    console.log();
    await this.axiosInstance
      .get('/product-projections')
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
