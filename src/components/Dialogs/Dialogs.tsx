import React from 'react';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogsItem';
import { Field, reduxForm } from 'redux-form';
import {
  Input,
  createField,
  Textarea, // @ts-ignore
} from '../common/FormsControls/FormsControls.tsx';
import {
  requiredField,
  maxLengthCreator, // @ts-ignore
} from '../../validation/validators.ts';
import { InitialStateType } from '../../redux/dialogsReducer';
import { InjectedFormProps } from 'redux-form';

import s from './Dialogs.module.scss';

type OwnPropsType = {
  dialogsData: any;
  dialogsPage: InitialStateType;
  sendMessage: (newMessageBody: string) => void;
};

const Dialogs: React.FC<OwnPropsType> = (props) => {
  const state = props.dialogsData;
  const dialogsElements = state.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));

  const messagesElements = state.messagesData.map((message) => (
    <Message message={message.message} id={message.id} key={message.id} />
  ));

  const addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          <div>{messagesElements}</div>
          <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    </>
  );
};

const maxLength15 = maxLengthCreator(15);

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<NewMessageFormValuesKeysType>(
        'Enter you message.',
        'newMessageBody',
        [requiredField, maxLength15],
        Input
      )}

      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

export default Dialogs;

type NewMessageFormValuesType = {
  newMessageBody: string;
};

type PropsType = {};
type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>;
