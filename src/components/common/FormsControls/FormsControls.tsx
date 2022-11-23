import React from 'react';
import { Field } from 'redux-form';
import { ValidatorType } from '../../../validation/validators';
// @ts-ignore
import styles from './FormsControls.module.scss';

export const Textarea = ({ input, meta, ...props }): any => {
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

export const Input = ({ input, meta, ...props }): any => {
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
  placeholder: string,
  name: string,
  validate: Array<ValidatorType>,
  component: string | React.Component | React.FC,
  props = {},
  text = ''
) => (
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
