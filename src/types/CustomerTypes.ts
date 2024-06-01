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

// Subset of customer --------------------------------
export type CustomerProfileSubset = Pick<Customer, 'email' | 'firstName' | 'lastName' | 'dateOfBirth'>;

export type CustomerAddressSubset = Pick<
  Customer,
  'addresses' | 'shippingAddressIds' | 'billingAddressIds' | 'defaultBillingAddressId' | 'defaultShippingAddressId'
>;

// Validation --------------------------------
export interface IProfileValuesValidation {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface IPasswordValuesValidation {
  currentPassword?: string;
  newPassword?: string;
}

export interface IAddressValuesValidation {
  city: string;
  streetName: string;
  country: string;
  postalCode: string | undefined;
}
