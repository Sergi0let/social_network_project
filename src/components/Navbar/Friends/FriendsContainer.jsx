import { connect } from 'react-redux';

import Friends from './Friends';

const mapStateToProps = (state) => {
  return {
    userFriends: state.sidebar.userFriends,
  };
};

const FriendsContainer = connect(mapStateToProps)(Friends);
export default FriendsContainer;
