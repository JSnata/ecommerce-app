import React from 'react';
import ProductsList from '../../components/ProdictsList/ProductsList';
import { ICustomerAddress, ICustomerCreateData } from '../../types/CustomerTypes';
import { Country } from '../../types/enumCounty';
import { signingCustomer } from '../../API/CustomerAPI';
import { createCustomer } from '../../API/ClientAPI';

function MainPage() {
  const testCustomerAddress: ICustomerAddress = {
    street: 'Street for Test',
    city: 'Test City',
    postalCode: '12345',
    country: Country.Afghanistan,
  };

  const testCustomer: ICustomerCreateData = {
    email: 'sss@example.com',
    password: '1q3EJO6Ele4BTF',
    firstName: 'Test2',
    lastName: 'Test2',
    addresses: [testCustomerAddress],
    defaultShippingAddress: 0,
    shippingAddresses: [0],
    defaultBillingAddress: 0,
    billingAddresses: [0],
  };

  const handleCreate = () => {
    createCustomer({ ...testCustomer })
      .then((response) => {
        console.log('Customer created:', response);
      })
      .catch((error) => {
        console.error('Error creating customer:', error);
      });
  };
  const handlerSignIn = () => {
    signingCustomer('sss@example.com', '1q3EJO6Ele4BTF')
      .then((response) => {
        console.log('Customer signed in successfully', response);
      })
      .catch((error) => {
        console.error('Error signing in customer:', error);
      });
  };

  return (
    <div>
      <button type="button" onClick={handleCreate}>
        CreateCustomer
      </button>
      <button type="button" onClick={handlerSignIn}>
        LoginCustomer
      </button>

      <ProductsList />
    </div>
  );
}

export default MainPage;
