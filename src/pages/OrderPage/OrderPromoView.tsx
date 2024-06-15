import React from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import type { DiscountCode } from '@commercetools/platform-sdk';
import usePromo from '../../hooks/usePromo';

function OrderPromo() {
  const { promos } = usePromo();

  console.log(promos, 'PROMO DATA');

  return (
    <Container>
      <Row>
        <h4>Available promo codes</h4>
      </Row>
      <Row>
        <small className="text-muted">Enter in Cart discount field</small>
      </Row>
      <Row>
        {promos && promos.length > 0 ? (
          <CardGroup>
            {promos.map((item: DiscountCode) => {
              const description = item?.description?.['en-GB'];
              const name = item.code;
              return (
                <Col key={item.id}>
                  <Card>
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
