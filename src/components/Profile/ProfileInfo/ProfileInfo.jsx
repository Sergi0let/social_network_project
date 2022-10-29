import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';

import s from '../Profile.module.scss';
// import userProfile from '../../../assets/images/userProfile.jpg';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.profileWrapper}>
      <div>
        <img src={props.profile.photos.large} alt="Profile user" />
      </div>
      <div className={s.profileContent}>
        <div className={s.profileText}>{props.profile.fullName}</div>
        <div className={s.profileText}>
          <span>Date of birth: </span>2 October
        </div>
        <div className={s.profileText}>
          <span>Location: </span>Kyiv
        </div>
        <div className={s.profileText}>{props.profile.lookingForAJob}</div>
        <div className={s.profileText}>
          {props.profile.lookingForAJobDescription}
        </div>
      </div>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
    </div>
  );
};
export default ProfileInfo;
