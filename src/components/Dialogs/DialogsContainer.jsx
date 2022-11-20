import Dialogs from './Dialogs';
import { connect } from 'react-redux';

import { sendMessage } from '../../redux/dialogsReducer.ts';
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

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => dispatch(sendMessage(newMessageBody)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
