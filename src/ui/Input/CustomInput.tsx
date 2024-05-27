import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useField } from 'formik';
import { CheckCircleFill, PencilSquare } from 'react-bootstrap-icons';

interface ICustomTextInput {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  id?: string;
  isEditable?: boolean;
  handleSave?: (data: { name: string; value: string }) => Promise<void>;
}

// eslint-disable-next-line react/function-component-definition
const CustomTextInput: React.FC<ICustomTextInput> = ({
  label,
  name,
  type,
  placeholder,
  id,
  isEditable = false,
  handleSave,
}) => {
  const [field, meta] = useField(name);
  const [editMode, setEditMode] = useState(false);
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
    const data = {
      name: field.name,
      value: field.value,
    };
    if (!meta.error && handleSave) {
      try {
        const response = await handleSave(data);
        console.log(response);
        edit();
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
      }
    }
    edit();
    console.log('meta errrors', meta.error);
    console.log('meta', field.name, field.value);
  };

  return (
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
          {meta.touched && meta.error && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
        </>
      ) : (
        <>
          <Form.Control
            readOnly={isEditable}
            value={field.value || ''}
            isInvalid={meta.touched && !!meta.error}
            type={type}
            ref={inputRef}
          />
          {meta.touched && meta.error && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
        </>
      )}
      {isEditable && (
        <Button variant={editMode ? 'success' : 'dark'} onClick={editMode ? save : edit}>
          {editMode ? <CheckCircleFill /> : <PencilSquare />}
        </Button>
      )}
    </InputGroup>
  );
};

export default CustomTextInput;
