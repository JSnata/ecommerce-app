import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useField } from 'formik';
import Country from '../../types/enumCounty';

type SelectField = {
  label: string;
  name: string;
  value: string;
};

function SelectFieldCountry({ label, name, value }: SelectField) {
  const [field, meta] = useField(name);
  return (
    <InputGroup className="mb-4">
      <InputGroup.Text>{label}</InputGroup.Text>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Form.Control as="select" {...field} isInvalid={meta.touched && !!meta.error}>
        {name === 'country' && (
          <>
            <option value="">{value || 'Select a country'}</option>
            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {Object.entries(Country).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </>
        )}
      </Form.Control>
      {meta.touched && meta.error ? <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback> : null}
    </InputGroup>
  );
}

export default SelectFieldCountry;
