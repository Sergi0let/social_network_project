import React from 'react';

import Message from './Message/Message';
import DialogItem from './DialogItem/DialogsItem';

import s from './Dialogs.module.scss';
import { Field, reduxForm } from 'redux-form';

const Dialogs = (props) => {
  const dialogsElements = props.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));

  const messagesElements = props.messagesData.map((message) => (
    <Message message={message.message} id={message.id} key={message.id} />
  ));

  const addNewMessage = (values) => {
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

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component="textarea"
        name="newMessageBody"
        placeholder="Enter you message."
      />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
  AddMessageForm
);

export default Dialogs;
