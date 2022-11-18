import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Profile from './Profile';
import {
  getUserProfile,
  updateStatus,
  getStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profileReducer';
import withAuthRedirect from '../../hoc/WithAuthRedirect';

// const myId = 26438;

class ProfileContainer extends React.Component {
  componentDidMount() {
    const { getUserProfile, getStatus, authorizedUserId, router } = this.props;
    let profileId = router.params.profileId;
    if (!profileId) {
      profileId = authorizedUserId;
    }
    getUserProfile(profileId);
    getStatus(profileId);
  }
  render() {
    const { profile, updateStatus, status } = this.props;

    return (
      <Profile
        {...this.props}
        isOvner={!this.props.router.params.profileId}
        profile={profile}
        updateStatus={updateStatus}
        status={status}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
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
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
