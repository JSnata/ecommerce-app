import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { MyCustomerUpdate } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { MyCustomerChangePassword } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import signingCustomer from './helpers/CustomerAPI';
import { ICustomerCreateData } from '../types/CustomerTypes';
import { createCustomer } from './helpers/ClientAPI';
import createAxiosInstance from './helpers/axiosInstance';
import { userTokenCache } from './root/BuildCustomer';
import { createApiCustomerWithKey } from './root/BuildCustomerWithKey';
/**
 * ApiService is a class that provides methods for interacting with the CommerceTools API.
 */
export default class ApiService {
  /**
   * A static property that holds an instance of ByProjectKeyRequestBuilder.
   * It is initialized as undefined and will be set after a successful login.
   */
  static userApi: ByProjectKeyRequestBuilder | undefined = undefined;

  /**
   * A static property that holds an instance of AxiosInstance.
   * It is initialized after a successful login.
   */
  static axiosInstance: AxiosInstance;

  static start() {
    const { token } = userTokenCache.get();
    if (!token) {
      return;
    }
    this.axiosInstance = createAxiosInstance();
    this.userApi = createApiCustomerWithKey(token);
  }

  /**
   * A static asynchronous method that logs in a user using their email and password.
   * It sets the userApi and axiosInstance properties after a successful login.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns {Promise<void>}
   */
  static async login(email: string, password: string) {
    try {
      this.userApi = await signingCustomer(email, password);
      this.axiosInstance = createAxiosInstance();
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
    }
    return this.userApi;
  }

  /**
   * A static asynchronous method that registers a new customer using the provided data.
   * @param data - The data for creating a new customer.
   * @returns {Promise<void>}
   */
  static async register(data: ICustomerCreateData) {
    try {
      const response = await createCustomer({ ...data });
      return response;
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async updateCustomer(update: MyCustomerUpdate) {
    try {
      return await this.userApi
        ?.me()
        .post({
          body: update,
        })
        .execute();
    } catch (err) {
      console.error(err);
      // toast.error(`${err}`);
      return null;
    }
  }

  static async changePassword(passwordChange: MyCustomerChangePassword) {
    try {
      return await this.userApi
        ?.me()
        .password()
        .post({
          body: passwordChange,
        })
        .execute();
    } catch (err) {
      console.error(err);
      // toast.error(`${err}`);
      return null;
    }
  }

  static async getCustomerData() {
    try {
      return await this.userApi?.me().get().execute();
    } catch (err) {
      console.error(err);
      // toast.error(`${err}`);
      return null;
    }
  }
}

ApiService.start();
