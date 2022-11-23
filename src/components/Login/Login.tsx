import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { reduxForm } from 'redux-form';
// @ts-ignore
import { login } from '../../redux/authReducer.ts';
import { requiredField } from '../../validation/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { InjectedFormProps } from 'redux-form';
// @ts-ignore
import s from './Login.module.scss';

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({
  handleSubmit,
  error,
}) => {
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

const LoginReduxForm = reduxForm<LoginFormValuesType>({
  form: 'contact',
})(LoginForm);

type MapStateToPropsType = {
  auth: any;
  isAuth: boolean;
};
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({
  isAuth,
}) => {
  const onSubmit = ({ email, password, rememberMe }: LoginFormValuesType) => {
    login(email, password, rememberMe);
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

const mapStateToProps = (state: MapStateToPropsType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps, { login })(Login);
