import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/user.png';

import s from '../Profile.module.scss';

const ProfileInfo = ({ profile, updateStatus, status, isOvner, savePhoto }) => {
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotSelector = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  return (
    <div className={s.profileWrapper}>
      <div>
        <img src={profile.photos.large || userPhoto} alt="Profile user" />
        {isOvner && <input type={'file'} onChange={onMainPhotSelector} />}
      </div>
      <div className={s.profileContent}>
        <div className={s.profileText}>{profile.fullName}</div>
        <div className={s.profileText}>
          <span>My id: </span>
          {profile.userId}
        </div>
        <div className={s.profileText}>
          <span>aboutMe: </span>
          {profile.aboutMe}
        </div>
        <div className={s.profileText}>My email: {profile.contacts.email}</div>
        <div className={s.profileText}>
          Facebook: {profile.contacts.facebook}
        </div>
        <div className={s.profileText}>
          instagram: {profile.contacts.instagram}
        </div>

        <div className={s.profileText}>{profile.lookingForAJob}</div>
        <div className={s.profileText}>{profile.lookingForAJobDescription}</div>
      </div>
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};
export default ProfileInfo;
/*
{
         "aboutMe": "я круто чувак",
         "contacts": {
                    "skype": "skyp",
                    "vk": "vk.com",
                    "facebook": "facebook",
                    "icq": "icq",
                    "email": "email",
                    "googlePlus": "gogep",
                    "twitter": "twitter",
                    "instagram": "instagra",
                    "whatsApp": "watsap"
                   },
         "lookingForAJob": true,
         "lookingForAJobDescription": 'Ищу работу, знаю это это и это',
         "fullName": "samurai dmitry",
         "userId": 2
 }
*/
