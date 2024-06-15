import React from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import type { DiscountCode } from '@commercetools/platform-sdk';
import usePromo from '../../hooks/usePromo';

function OrderPromo() {
  const { promo } = usePromo();

  console.log(promo, 'PROMO DATA');

  return (
    <Container>
      <Row>
        <h4>Available promo codes</h4>
      </Row>
      <Row>
        <small className="text-muted">Enter in Cart discount field</small>
      </Row>
      <Row>
        {promo && promo.length > 0 ? (
          <CardGroup>
            {promo.map((item: DiscountCode) => {
              const description = item?.description?.['en-GB'];
              const name = item.code;
              return (
                <Col>
                  <Card key={item.id}>
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </CardGroup>
        ) : (
          ''
        )}
      </Row>
    </Container>
  );
}

export default OrderPromo;
