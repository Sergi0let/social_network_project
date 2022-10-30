import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { requiredField } from '../../validation/validators';
import { Input } from '../common/FormsControls/FormsControls';

import s from './Login.module.scss';

const LoginForm = (props) => {
  return (
    <form className={s.form} onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Email"
          name={'email'}
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
      <div>{props.error && <div>{props.error}</div>}</div>
      <div>
        <button className={s.formButton}>Submin</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'contact' })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className={s.formBlock}>
      <h4 className={s.formTitle}>Login</h4>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps, { login })(Login);
