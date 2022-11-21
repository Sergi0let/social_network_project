import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.scss';

const Profile = ({
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
