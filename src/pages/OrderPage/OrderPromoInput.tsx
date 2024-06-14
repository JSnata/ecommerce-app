// import { Formik } from 'formik';
// import * as yup from 'yup';
import React from 'react';
// import { Col, Form } from 'react-bootstrap';

function OrderPromoInput() {
  // const schema = yup.object().shape({
  //   promo: yup.string().min(2, 'Too Short').max(10, 'Too long').required('Input promo here'),
  // });
  return (
    <>
      <p>Input Promo</p>
      {/* <Formik
        initialValues={{
          promo: '',
        }}
        validationSchema={schema}
        onSubmit={(value) => {
        console.log(value, 'Value from pomo input');
        }}
        {({ handleSubmit, values, touched, errors }) => (
         <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Use promocode</Form.Label>
              <Form.Control
                type="text"
                name="promo"
                value={values.promo}
                isValid={touched.promo && !errors.promo}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
         </Form>
       )}
      ></Formik> */}
    </>
  );
}

export default OrderPromoInput;
