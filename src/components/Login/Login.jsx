import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { requiredField } from '../../validation/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';

import s from './Login.module.scss';

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      {createField('Email', 'email', [requiredField], Input)}
      {createField('Password', 'password', [requiredField], Input)}
      {createField(
        null,
        'rememberMe',
        null,
        Input,
        { type: 'checkbox' },
        'rememberMe'
      )}

      <div>{error && <div>{error}</div>}</div>
      <div>
        <button className={s.formButton}>Submin</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'contact' })(LoginForm);

const Login = ({ isAuth, login }) => {
  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe);
  };

  if (isAuth) {
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
