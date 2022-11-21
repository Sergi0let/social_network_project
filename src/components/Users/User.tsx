import React from 'react';
import { NavLink } from 'react-router-dom';

// @ts-ignore
import s from './users.module.scss';
// @ts-ignore
import userPhoto from '../../assets/images/user.png';
import { PhotosType, UserType } from '../../types/types';

type UserPropsType = {
  id: number;
  photos: PhotosType;
  followingInProgress: Array<UserType>;
  followed: boolean;
  status: string;

  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const User: React.FC<UserPropsType> = ({
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
