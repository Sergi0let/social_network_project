import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './users.module.scss';
import userPhoto from '../../assets/images/user.png';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  console.log(props.followingInProgress);
  return (
    <div className={s.numPage}>
      {pages.map((page) => (
        <span
          className={props.currentPage === page && s.selectedPage}
          onClick={() => props.onPageChanged(page)}
        >
          {page}
        </span>
      ))}
      {props.users.map((user, i) => (
        <div key={i}>
          <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img
                  className={s.photoUser}
                  src={
                    user.photos.small !== null ? user.photos.small : userPhoto
                  }
                  alt="User"
                />
              </NavLink>
            </div>
          </span>
          <span>
            <div>
              {user.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => props.unFollow(user.id)}
                >
                  Follow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => props.follow(user.id)}
                >
                  Unfollow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.id}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{'user.location.city'}</div>
              <div>{'user.location.country'}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
