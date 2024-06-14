import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CardGroup, Col, Container, Row, Stack } from 'react-bootstrap';
import useCart, { type CartItem } from '../../hooks/useCart';
import OrderSummary from './OrderSummary';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

function OrderPage() {
  const { cartItems, removeFromCart, changeQuantity, clearCart, cart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmation = () => {
    clearCart().then(() => handleCloseModal());
  };

  const totalPrice = cart && cart.totalPrice ? cart.totalPrice.centAmount / 100 : 0;

  return (
    <Container fluid>
      <h1>My Orders</h1>
      {cartItems && cartItems.length > 0 ? (
        <>
          <Row>
            <Col sm={12} md={4}>
              <h5>Manage Orders</h5>
              <Row className="lead">Current Total Price : {totalPrice}</Row>
              <Row>
                <Button variant="dark" onClick={handleShowModal}>
                  Clear Cart
                </Button>
              </Row>

              <Row />
            </Col>
            <Col sm={12} md={8}>
              <h5>Products</h5>
              <CardGroup>
                {cartItems.map((item: CartItem) => (
                  <OrderSummary
                    key={item.id}
                    quantity={item.quantity}
                    price={item.price}
                    totalPrice={item.totalPrice}
                    productId={item.productId}
                    productName={item.productName}
                    productImageLink={item.productImageLink}
                    onRemove={removeFromCart}
                    onChange={changeQuantity}
                  />
                ))}
              </CardGroup>
            </Col>
          </Row>
          <ModalWindow show={showModal} handleClose={handleCloseModal} modalSize="sm" title="Clear Cart">
            <Container>
              <Row>
                <p>Are you sure you want to empty your shopping cart?</p>
              </Row>
              <Stack direction="horizontal" gap={3}>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="dark" onClick={handleConfirmation}>
                  Yes
                </Button>
              </Stack>
            </Container>
          </ModalWindow>
        </>
      ) : (
        <>
          <h5>You no have products in cart...</h5>
          <Link to="/catalog" style={{ textDecoration: 'none' }}>
            <Button variant="dark">To Catalog</Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default OrderPage;
