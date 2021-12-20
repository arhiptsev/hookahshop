import React from 'react';
import { Form } from 'react-bootstrap';

interface CheckboxProps {
  value: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  label?: string;
  errors?: string | undefined;
  checked?: boolean;
}

export const Checkbox = ({
  value,
  placeholder,
  name,
  isInvalid,
  isValid,
  label,
  errors,
  checked,
  ...props
}: CheckboxProps) => (
  <>
    <Form.Check
      type="checkbox"
      value={value}
      placeholder={label || placeholder}
      name={name}
      label={label}
      isInvalid={isInvalid}
      isValid={isValid}
      {...props}
    />
    <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
  </>
);
