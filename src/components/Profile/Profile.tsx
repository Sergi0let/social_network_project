import React, { FC } from 'react';
// @ts-ignore
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileInfoType } from '../../types/types';
import s from './Profile.module.scss';

const Profile: FC<ProfileInfoType> = ({
  profile,
  status,
  updateStatus,
  isOvner,
  savePhoto,
  saveProfile,
}) => {
  return (
    <div className={s.profile}>
      <ProfileInfo
        isOvner={isOvner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
