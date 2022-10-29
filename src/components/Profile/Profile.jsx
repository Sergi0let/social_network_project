import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.scss';

const Profile = (props) => {
  return (
    <div className={s.profile}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
