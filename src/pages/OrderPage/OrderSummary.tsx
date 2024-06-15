import React from 'react';
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';

type OrderSummaryProps = {
  quantity: number;
  price: number;
  totalPrice: number;
  productId: string;
  productName: string;
  productImageLink: string;
  onRemove?: (id: string) => Promise<void>;
  onChange?: (id: string, quantity: number) => Promise<void>;
};

function OrderSummary({
  productId,
  quantity,
  price,
  totalPrice,
  productName,
  productImageLink,
  onRemove,
  onChange,
}: OrderSummaryProps) {
  const handleIncrement = () => {
    if (onChange) {
      onChange(productId, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (onChange) {
      onChange(productId, quantity - 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(productId);
    }
  };
  return (
    <Card className="d-flex flex-column h-100" style={{ width: '100%' }}>
      <Card.Img variant="top" className="object-fit-cover h-50" src={productImageLink || ''} />
      <Card.Body>
        <Card.Title className="text-center">{productName}</Card.Title>
        <ListGroup className="list-group-flush text-center">
          <ListGroup.Item>Single Price: {price} €</ListGroup.Item>
          <ListGroup.Item>Total Price: {totalPrice} €</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-center">
          <Col sm={12} xl={6}>
            <InputGroup style={{ width: '100%' }}>
              <Button variant="dark" onClick={handleDecrement}>
                -
              </Button>
              <FormControl aria-describedby="" value={quantity} style={{ textAlign: 'center' }} readOnly />
              <Button variant="dark" onClick={handleIncrement}>
                +
              </Button>
            </InputGroup>
          </Col>
          <Col sm={12} xl={6} className="d-flex justify-content-center">
            <Button className="mx-2 my-1" type="button" size="sm" variant="danger" onClick={handleRemove}>
              Delete
              <Trash3Fill />
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default OrderSummary;
