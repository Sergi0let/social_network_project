import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { requiredField } from '../../validation/validators';
import { Input } from '../common/FormsControls/FormsControls';

import s from './Login.module.scss';

const LoginForm = (props) => {
  return (
    <form className={s.form} onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Login"
          name={'login'}
          component={Input}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field
          placeholder="Password"
          name={'password'}
          component={Input}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field
          placeholder="input"
          name={'rememberMe'}
          component={Input}
          type={'checkbox'}
        />
        rememberMe
      </div>
      <div>
        <button className={s.formButton}>Submin</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'contact' })(LoginForm);

const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className={s.formBlock}>
      <h4 className={s.formTitle}>Login</h4>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
