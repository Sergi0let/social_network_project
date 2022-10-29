import Dialogs from './Dialogs';
import { connect } from 'react-redux';

import { sendMessage, updateMessageBody } from '../redux/dialogsReducer.js';
import withAuthRedirect from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    dialogsData: state.messagePage.dialogsData,
    messagesData: state.messagePage.messagesData,
    newMessageBody: state.messagePage.newMessageBody,
  };
};

export default compose(
  connect(mapStateToProps, { sendMessage, updateMessageBody }),
  withAuthRedirect
)(Dialogs);
