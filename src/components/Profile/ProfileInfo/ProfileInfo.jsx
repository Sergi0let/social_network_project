import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';

import s from '../Profile.module.scss';

const ProfileInfo = ({ profile, updateStatus, status }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className={s.profileWrapper}>
      <div>
        <img src={profile.photos.large} alt="Profile user" />
      </div>
      <div className={s.profileContent}>
        <div className={s.profileText}>{profile.fullName}</div>
        <div className={s.profileText}>
          <span>Date of birth: </span>2 October
        </div>
        <div className={s.profileText}>
          <span>Location: </span>Kyiv
        </div>
        <div className={s.profileText}>{profile.lookingForAJob}</div>
        <div className={s.profileText}>{profile.lookingForAJobDescription}</div>
      </div>
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};
export default ProfileInfo;
