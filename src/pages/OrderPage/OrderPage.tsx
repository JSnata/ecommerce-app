import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import useCart, { type CartItem } from '../../hooks/useCart';
import OrderSummary from './OrderSummary';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import OrderPromoInput from './OrderPromoInput';

function OrderPage() {
  const { cartItems, removeFromCart, changeQuantity, clearCart, cart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmation = async () => {
    await clearCart();
    handleCloseModal();
  };

  const totalPrice = cart && cart.totalPrice ? cart.totalPrice.centAmount / 100 : 0;
  const discount = cart && cart.discountOnTotalPrice ? cart.discountOnTotalPrice.discountedAmount.centAmount / 100 : 0;
  return (
    <Container>
      <h1>My Orders</h1>
      {cartItems && cartItems.length > 0 ? (
        <>
          <Row>
            <Col sm={12} md={4}>
              <h5>Manage Orders</h5>
              <Row>
                <div className="lead my-4">
                  {cart?.discountOnTotalPrice ? (
                    <>
                      <p>
                        Total price : <b className="text-decoration-line-through">{totalPrice + discount} EUR</b>
                      </p>
                      <p>
                        Your price : <b className="text-success">{totalPrice} EUR</b>
                      </p>
                    </>
                  ) : (
                    <p>
                      Total Price : <b className="">{totalPrice} EUR</b>
                    </p>
                  )}
                </div>
              </Row>

              <Button variant="dark" onClick={handleShowModal}>
                Clear Cart
              </Button>

              <Row>
                <OrderPromoInput />
              </Row>
            </Col>

            <Col sm={12} lg={8}>
              <h5>Products</h5>
              <Row>
                {cartItems.map((item: CartItem) => (
                  <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
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
                  </Col>
                ))}
              </Row>
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
