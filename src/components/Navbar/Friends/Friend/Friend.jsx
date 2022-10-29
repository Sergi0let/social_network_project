import React from 'react';

import s from '../Friends.module.scss';

const Friend = (props) => {
  return (
    <div className={s.item}>
      <div className={s.image}>
        {/* <img src="./images/user1.jpg" alt="friend" /> */}
      </div>
      <p>{props.name}</p>
    </div>
  );
};

export default Friend;
