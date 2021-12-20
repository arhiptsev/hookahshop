import { FieldValidator, useField } from 'formik';
import React from 'react';
import { Checkbox as CheckboxControl } from '../../controls';

interface CheckboxProps {
  placeholder?: string;
  name: string;
  label?: string;
  errors?: string | undefined;
  type?: string;
  as?: React.ElementType;
  validate?: FieldValidator;
  value: any;
}

export const Checkbox = ({
  placeholder,
  name,
  label,
  value,
  as,
  validate,
  ...props
}: CheckboxProps) => {
  const [field, meta, helpers] = useField({
    name,
    validate,
    type: 'checkbox',
    value,
  });

  return (
    <CheckboxControl
      isInvalid={!!meta.touched && !!meta.error}
      errors={meta.error}
      placeholder={placeholder}
      label={label}
      {...field}
    />
  );
};
