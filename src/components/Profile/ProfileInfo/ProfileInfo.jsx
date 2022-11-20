import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/user.png';

import s from '../Profile.module.scss';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({
  profile,
  updateStatus,
  status,
  isOvner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotSelector = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => setEditMode(false));
  };

  return (
    <div className={s.profileWrapper}>
      <div>
        <img src={profile.photos.large || userPhoto} alt="Profile user" />
        {isOvner && <input type={'file'} onChange={onMainPhotSelector} />}
      </div>

      {editMode ? (
        <ProfileDataForm
          initialValues={profile}
          profile={profile}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileData
          profile={profile}
          isOvner={isOvner}
          goToEditMode={() => setEditMode(true)}
        />
      )}
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};
export default ProfileInfo;

const ProfileData = ({ profile, isOvner, goToEditMode }) => {
  return (
    <div className={s.profileContent}>
      {isOvner && (
        <div>
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
      <div className={s.profileText}>
        <b>My fullname</b>: {profile.fullName}
      </div>
      <div className={s.profileText}>
        <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      <div className={s.profileText}>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
      <div className={s.profileText}>
        <b>Contacts</b>:
        {Object.keys(profile.contacts)
          .map((key) => (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          ))
          .filter((social) => social.props.contactValue)}
      </div>
    </div>
  );
};

const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

/*
(
          <Contacts
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key]}
          />
        )
        */
