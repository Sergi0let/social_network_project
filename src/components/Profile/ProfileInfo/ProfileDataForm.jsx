import React from 'react';
import { reduxForm } from 'redux-form';

import {
  createField,
  Input,
  Textarea,
} from '../../common/FormsControls/FormsControls.tsx';

import s from '../Profile.module.scss';

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form className={s.profileContent} onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      <div>{error && <div>{error}</div>}</div>
      <div className={s.profileText}>
        <b>My fullname</b>: {createField('Full name', 'fullname', [], Input)}
      </div>
      <div className={s.profileText}>
        <b>Looking for a job</b>:
        {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>
      <div className={s.profileText}>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
        {createField(
          'Professions skills',
          'lookingForAJobDescription',
          [],
          Textarea
        )}
      </div>
      <div className={s.profileText}>
        <b>About Me</b>: {profile.aboutMe}
        {createField('About Me', 'aboutMe', [], Textarea)}
      </div>
      <div className={s.profileText}>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => (
          <div key={key}>
            <b>
              {key}: {createField(key, 'contacts.' + key, [], Input)}
            </b>
          </div>
        ))}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
