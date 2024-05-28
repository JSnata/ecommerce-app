import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useField } from 'formik';
import { CheckCircleFill, PencilSquare } from 'react-bootstrap-icons';

type CustomTextInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  id?: string;
  isEditable?: boolean;
  handleSave?: (data: { name: string; value: string }) => Promise<void>;
};

function CustomTextInput({ label, name, type, placeholder, id, isEditable = false, handleSave }: CustomTextInputProps) {
  const [field, meta] = useField(name);
  const [editMode, setEditMode] = useState(!isEditable);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditable && editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode, isEditable]);
  const edit = () => {
    setEditMode(!editMode);
  };

  const save = async () => {
    if (meta.error) {
      return;
    }
    const data = {
      name: field.name,
      value: field.value,
    };
    if (!meta.error && handleSave) {
      try {
        await handleSave(data);
        edit();
      } catch (error) {
        console.error('Save Error:', error);
      }
    }
    edit();
  };

  return (
    <Row>
      <Col>
        <InputGroup>
          <InputGroup.Text>{label}</InputGroup.Text>
          {editMode ? (
            <>
              <Form.Control
                id={id || name}
                name={field.name}
                type={type}
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                isInvalid={meta.touched && !!meta.error}
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {meta.touched && meta.error ? meta.error : '\u200B'}
              </Form.Control.Feedback>
            </>
          ) : (
            <>
              <Form.Control
                id={id || name}
                name={field.name}
                readOnly={!editMode && isEditable}
                value={field.value || ''}
                isInvalid={meta.touched && !!meta.error}
                onChange={field.onChange}
                onBlur={field.onBlur}
                type={type}
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {meta.touched && meta.error ? meta.error : '\u200B'}
              </Form.Control.Feedback>
            </>
          )}
        </InputGroup>
      </Col>
      <Col xs={1} sm={1}>
        {isEditable && (
          <Button variant={editMode ? 'secondary' : 'dark'} onClick={editMode ? save : edit}>
            {editMode ? <CheckCircleFill /> : <PencilSquare />}
          </Button>
        )}
      </Col>
    </Row>
  );
}

export default CustomTextInput;
