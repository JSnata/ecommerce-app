import { BaseAddress, Customer, CustomerDraft } from '@commercetools/platform-sdk';
import Country from './enumCounty';

export interface ICustomerCreateData extends CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses: ICustomerAddress[] | undefined;
  defaultShippingAddress?: number;
  shippingAddresses: number[];
  defaultBillingAddress?: number;
  billingAddresses: number[];
}
export interface ICustomerAddress extends BaseAddress {
  street: string;
  city: string;
  postalCode: string;
  country: Country;
}

export interface IProfileValuesValidation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  country_billing: string;
  city_billing: string;
  street_billing: string;
  code_billing: string | undefined;
}

export type CustomerMainProfileSubset = Pick<Customer, 'email' | 'firstName' | 'lastName' | 'dateOfBirth'>;

export type CustomerAddressSubset = Pick<
  Customer,
  'addresses' | 'shippingAddressIds' | 'billingAddressIds' | 'defaultBillingAddressId' | 'defaultShippingAddressId'
>;

export type CustomerPasswordSubset = Pick<Customer, 'password'>;
