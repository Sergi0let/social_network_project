import React from 'react';
import Friend from './Friend/Friend';

import s from './Friends.module.scss';

const Friends = (props) => {
  const colors = ['yellow', 'red', 'blue', 'aqua', 'green', 'purple', 'blue'];
  let friend = (text) =>
    text
      .split('')
      .map((letter, i) => <span style={{ color: colors[i] }}>{letter}</span>);
  return (
    <div className={s.friends}>
      <h4>{friend('Friends')}</h4>
      <div className={s.friendsContainer}>
        {props.userFriends.map((friend) => (
          <Friend key={friend.id} name={friend.name} id={friend.id} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
