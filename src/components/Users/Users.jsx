import React from 'react';

import Paginator from '../common/Paginator/Paginator';
import User from './User';

import s from './users.module.scss';

const Users = ({
  pageSize,
  totalUsersCount,
  onPageChanged,
  currentPage,
  users,
  followingInProgress,
  follow,
  unFollow,
}) => {
  return (
    <div className={s.numPage}>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((user) => (
        <User
          key={user.id}
          {...user}
          followingInProgress={followingInProgress}
          follow={follow}
          unFollow={unFollow}
        />
      ))}
    </div>
  );
};

export default Users;
