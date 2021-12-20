import { FieldValidator, useField } from 'formik';
import React from 'react';
import { TextField as TextFieldControl } from '../../controls';

interface TextFieldProps {
  placeholder?: string;
  name: string;
  label?: string;
  errors?: string | undefined;
  type?: string;
  as?: React.ElementType;
  validate?: FieldValidator;
}

export const TextField = ({
  placeholder,
  name,
  label,
  type = 'text',
  as,
  validate,
  ...props
}: TextFieldProps) => {
  const [field, meta, helpers] = useField({ name, validate });
  // return (
  //   <>
  //     <label>
  //       {label}
  //       <input {...field} {...props} />
  //     </label>
  //     {meta.touched && meta.error ? (
  //       <div className="error">{meta.error}</div>
  //     ) : null}
  //   </>
  // );

  return (
    <TextFieldControl
      isInvalid={!!meta.touched && !!meta.error}
      errors={meta.error}
      placeholder={placeholder}
      label={label}
      type={type}
      as={as}
      {...field}
    />
  );
};
