import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { Country } from './enumCounty';

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
