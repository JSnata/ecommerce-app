import React from 'react';
import { Container } from 'react-bootstrap';
import useCart from '../../hooks/useCart';

function OrderPage() {
  const { cartItems } = useCart();
  console.log('CARTITEMS', cartItems);

  return (
    <Container>
      {cartItems.map((item) => {
        return (
          <div>
            <h1>Hello cart</h1>
            <p>{item.productName}</p>
            <p>{item.id}</p>
          </div>
        );
      })}
    </Container>
  );
}

export default OrderPage;
