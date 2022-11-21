import React, { FC } from 'react';
// @ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User';
import { UserType } from '../../types/types';
// @ts-ignore
import s from './users.module.scss';

type PropsType = {
  pageSize: number;
  totalUsersCount: number;
  onPageChanged: (pageNum: number) => void;
  currentPage: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unFollow: () => void;
  follow: () => void;
};
const Users: FC<PropsType> = ({
  pageSize,
  totalUsersCount,
  onPageChanged,
  currentPage,
  users,
  ...props
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
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unFollow={props.unFollow}
        />
      ))}
    </div>
  );
};

export default Users;
