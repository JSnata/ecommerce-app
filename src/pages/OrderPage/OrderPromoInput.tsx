import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from 'yup';
import React, { useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import usePromo from '../../hooks/usePromo';

interface PromoFormValues {
  promo: string;
}

function OrderPromoInput() {
  const { addPromo } = usePromo();
  const schema = yup.object().shape({
    promo: yup.string().min(2, 'Too Short').max(10, 'Too long').required('Cant be empty'),
  });

  const handleSubmitPromo = useCallback(
    (values: PromoFormValues, { setSubmitting }: FormikHelpers<PromoFormValues>) => {
      console.log('submit', values);
      addPromo(values.promo).then((response) => {
        console.log('response promo', response);
        setSubmitting(false);
      });
    },
    [],
  );

  return (
    <Container className="my-5">
      <h5>Use promo code</h5>
      <Formik
        initialValues={{
          promo: '',
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
                  name="promo"
                  value={values.promo}
                  onChange={handleChange}
                  isValid={touched.promo && !errors.promo}
                  isInvalid={!!errors.promo}
                />
                <Form.Control.Feedback type="invalid">{errors.promo}</Form.Control.Feedback>
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
    </Container>
  );
}

export default OrderPromoInput;
