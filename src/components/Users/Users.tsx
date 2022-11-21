import React, { FC } from 'react';
// @ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx';
// @ts-ignore
import User from './User.tsx';
import { UserType } from '../../types/types';
// @ts-ignore
import s from './users.module.scss';

type PropsType = {
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  followed: boolean;
  onPageChanged: (pageNum: number) => void;
  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
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
          followed={props.followed}
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unFollow={props.unFollow}
        />
      ))}
    </div>
  );
};

export default Users;
