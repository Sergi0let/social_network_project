import React from 'react';

import Message from './Message/Message';
import DialogItem from './DialogItem/DialogsItem';

import s from './Dialogs.module.scss';

const Dialogs = (props) => {
  debugger;
  let state = props.messagePage;
  let dialogsElements = props.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));

  let messagesElements = props.messagesData.map((message) => (
    <Message message={message.message} id={message.id} key={message.id} />
  ));
  let messageBody = props.newMessageBody;

  const onSendMessageClick = () => {
    props.sendMessage();
  };
  const messageChange = (e) => {
    let body = e.target.value;
    props.updateMessageBody(body);
  };

  return (
    <>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          <div>{messagesElements}</div>
          <div>
            <textarea
              value={messageBody}
              onChange={messageChange}
              placeholder="Enter you message."
            />
            <div>
              <button onClick={onSendMessageClick}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialogs;
