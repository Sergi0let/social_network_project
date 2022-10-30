import React from 'react';

import styles from './FormsControls.module.scss';

export const Textarea = ({ input, meta, ...props }) => {
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

export const Input = ({ input, meta, ...props }) => {
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
