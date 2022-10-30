import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Header.module.scss';
import logoHeader from '../../assets/images/logo.webp';

const Header = (props) => {
  return (
    <div className={s.header}>
      <img src={logoHeader} alt="Logo" />
      <p>Lorem ipsum dolor sit amet.</p>
      <div>
        {props.isAuth ? (
          <>
            <div className={s.loginBlock}>{props.login}</div>
            <div onClick={props.logout} className={s.loginBlock}>
              Log out
            </div>
          </>
        ) : (
          <NavLink className={s.loginBlock} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
