import React from 'react';

import s from '../Friends.module.scss';

const Friend = (props) => {
  return (
    <li className={s.item}>
      <div className={s.image}></div>
      <p>{props.name}</p>
    </li>
  );
};

export default Friend;
