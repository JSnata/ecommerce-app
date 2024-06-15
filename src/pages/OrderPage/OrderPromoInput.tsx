import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from 'yup';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { DiscountCode } from '@commercetools/platform-sdk';
import usePromo from '../../hooks/usePromo';

interface PromoFormValues {
  promoName: string;
}

function OrderPromoInput() {
  const { addPromo, removePromo, appliedPromoCode, promos } = usePromo();
  const [currentPromo, setCurrentPromo] = useState<DiscountCode | undefined>(undefined);
  const schema = yup.object().shape({
    promoName: yup.string().min(2, 'Too Short').max(10, 'Too long').required('Cannot be empty'),
  });

  useEffect(() => {
    const current = promos?.find((promo) => promo.id === appliedPromoCode?.discountCode.id);
    console.log(currentPromo, 'CURRENT PROMO');
    if (current) {
      setCurrentPromo(current);
    }
  });

  const handleSubmitPromo = useCallback(
    (values: PromoFormValues, { setSubmitting }: FormikHelpers<PromoFormValues>) => {
      addPromo(values.promoName).then(() => {
        setSubmitting(false);
      });
    },
    [addPromo],
  );

  const handleDeletePromo = useCallback(() => {
    removePromo();
  }, [removePromo]);

  return (
    <Container className="my-5">
      <h5>Use promo code</h5>
      {appliedPromoCode ? (
        <div>
          <Form.Control type="text" placeholder={currentPromo?.code || '123'} disabled readOnly />
          <br />
          <Button variant="dark" type="button" onClick={handleDeletePromo}>
            Remove
          </Button>
        </div>
      ) : (
        <Formik
          initialValues={{
            promoName: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmitPromo}
        >
          {({ handleSubmit, handleChange, values, touched, errors }: FormikProps<PromoFormValues>) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="">
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="promoName"
                    value={values.promoName}
                    onChange={handleChange}
                    isValid={touched.promoName && !errors.promoName}
                    isInvalid={!!errors.promoName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.promoName}</Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
                <Col sm="2">
                  <Button variant="dark" type="submit">
                    Add
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}

export default OrderPromoInput;
