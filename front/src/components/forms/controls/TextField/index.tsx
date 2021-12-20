import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

interface TextFieldProps {
  value: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  label?: string;
  errors?: string | undefined;
  type?: string;
  as?: React.ElementType;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  name,
  isInvalid,
  isValid,
  label,
  errors,
  type = 'text',
  as,
  ...props
}: TextFieldProps) => (
  <FloatingLabel label={label}>
    <Form.Control
      as={as}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label || placeholder}
      name={name}
      isInvalid={isInvalid}
      isValid={isValid}
      {...props}
    />
    <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
  </FloatingLabel>
);
