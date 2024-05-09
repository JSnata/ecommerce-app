import React from 'react';
import ProductsList from '../../components/ProdictsList/ProductsList';
import { ICustomerAddress, ICustomerCreateData } from '../../types/CustomerTypes';
import { Country } from '../../types/enumCounty';
import { createCustomer } from '../../API/ClientAPI';
import { signingCustomer } from '../../API/CustomerAPI';

function MainPage() {
  const testCustomerAddress: ICustomerAddress = {
    street: 'Street for Test',
    city: 'Test City',
    postalCode: '12345',
    country: Country.Afghanistan,
  };

  const testCustomer: ICustomerCreateData = {
    email: 'TESTCustomer1@example.com',
    password: '123123123',
    firstName: 'I need Flower!!!',
    lastName: 'Faster!!!',
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
    signingCustomer('seb@example.com', 'D{k-i]`_=cqsonA8')
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
