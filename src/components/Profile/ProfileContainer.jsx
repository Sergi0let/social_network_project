import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getUserProfile,
  updateStatus,
  getStatus,
} from '../redux/profileReducer';
import withAuthRedirect from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

const myId = 26438;

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId;

    if (!profileId) {
      profileId = myId;
    }
    this.props.getUserProfile(profileId);
    this.props.getStatus(profileId);
  }
  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        updateStatus={this.props.updateStatus}
        status={this.props.status}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);