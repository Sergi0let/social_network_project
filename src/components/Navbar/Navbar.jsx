import React from 'react';
import { NavLink } from 'react-router-dom';
import FriendsContainer from './Friends/FriendsContainer';

import s from './Navbar.module.scss';

const Navbar = (props) => {
  return (
    <div className={s.navbar}>
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : '')}
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : '')}
            to="/dialogs"
          >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : '')}
            to="/users"
          >
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : '')}
            to="/news"
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : '')}
            to="/music"
          >
            Music
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : '')}
            to="/settings"
          >
            Settings
          </NavLink>
        </li>
      </ul>
      <FriendsContainer state={props.state} />
    </div>
  );
};

export default Navbar;
