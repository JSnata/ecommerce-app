import React from 'react';
import { Card, CardGroup, Container } from 'react-bootstrap';
import type { DiscountCode } from '@commercetools/platform-sdk';
import usePromo from '../../hooks/usePromo';

function OrderPromo() {
  const { promo } = usePromo();

  console.log(promo, 'PROMO DATA');

  return (
    <Container>
      {promo && promo.length > 0 ? (
        <CardGroup>
          <h5>
            <small className="text-muted">Available promocodes</small>
          </h5>
          <small className="text-muted">Enter in Cart discount field</small>
          {promo.map((item: DiscountCode) => {
            const description = item?.description?.['en-GB'];
            const name = item.code;
            return (
              <Card key={item.id}>
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>
      ) : (
        ''
      )}
    </Container>
  );
}

export default OrderPromo;
