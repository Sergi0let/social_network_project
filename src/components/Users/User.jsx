import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './users.module.scss';
import userPhoto from '../../assets/images/user.png';

const User = ({
  id,
  photos,
  followingInProgress,
  unFollow,
  follow,
  followed,
  status,
}) => {
  return (
    <div className={s.numPage}>
      <span>
        <div>
          <NavLink to={`/profile/${id}`}>
            <img
              className={s.photoUser}
              src={photos.small !== null ? photos.small : userPhoto}
              alt="User"
            />
          </NavLink>
        </div>
      </span>
      <span>
        <div>
          {followed ? (
            <button
              disabled={followingInProgress.some(
                (currentId) => currentId === id
              )}
              onClick={() => unFollow(id)}
            >
              Follow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some(
                (currentId) => currentId === id
              )}
              onClick={() => follow(id)}
            >
              Unfollow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{id}</div>
          <div>{status}</div>
        </span>
        <span>
          <div>{'user.location.city'}</div>
          <div>{'user.location.country'}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
