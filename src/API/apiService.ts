/* eslint-disable */
// import { useState } from 'react';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import signingCustomer from './helpers/CustomerAPI';
import { ICustomerCreateData } from '../types/CustomerTypes';
import { createCustomer } from './helpers/ClientAPI';
import createAxiosInstance from './helpers/axiosInstance';
import { userTokenCache } from './root/BuildCustomer';

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
      await createCustomer({ ...data });
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
    }
  }

  static async checkAuth() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_CTP_API_URL}/refresh`, { withCredentials: true });
      console.log(response);

      userTokenCache.set(response.data.token);

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * A static asynchronous method that retrieves a list of products from the API.
   * It logs the response data to the console.
   * @returns {Promise<void>}
   */
  static async getProducts() {
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
