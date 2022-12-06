// @ts-ignore
import Dialogs from './Dialogs.tsx';
import { connect } from 'react-redux'; // @ts-ignore
import { actions } from '../../redux/dialogsReducer.ts';
import withAuthRedirect from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/store-redux';

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: state.messagePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) =>
      dispatch(actions.sendMessage(newMessageBody)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
