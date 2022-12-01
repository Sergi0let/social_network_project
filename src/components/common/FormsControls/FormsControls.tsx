import React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { ValidatorType } from '../../../validation/validators';
// @ts-ignore
import styles from './FormsControls.module.scss';

export const Textarea: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={`${styles.formControl}  ${hasError ? styles.error : ''}`}>
      <div>
        <textarea {...props} {...input} />
      </div>
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}): any => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={`${styles.formControl}  ${hasError ? styles.error : ''}`}>
      <div>
        <input {...props} {...input} />
      </div>
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
};

export const createField = (
  placeholder: string | undefined,
  name: string,
  validate: Array<ValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ''
): React.ReactNode => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validate}
      component={component}
      {...props}
    />
    {text}
  </div>
);
