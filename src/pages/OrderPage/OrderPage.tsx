import React from 'react';
import { Container } from 'react-bootstrap';
import useCart from '../../hooks/useCart';

function OrderPage() {
  // const { user } = useAuthContext();
  const { cartItems } = useCart();

  return (
    <Container>
      {cartItems.map((item) => {
        return (
          <div>
            <p>{item.name}</p>
            <p>{item.id}</p>
          </div>
        );
      })}
    </Container>
  );
}

export default OrderPage;
