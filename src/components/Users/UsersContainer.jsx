import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  follow,
  unFollow,
  setCurrentPage,
  toggleFolowingProgress,
  getUsers,
} from '../../redux/usersReducer.ts';
import Users from './Users.tsx';
import Preloader from '../common/preloader/Preloader';
import {
  getPageSize,
  getUsersSelector,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { getUsers, currentPage, pageNumber } = this.props;
    getUsers(currentPage, pageNumber);
  }

  onPageChanged = (pageNum) => {
    const { getUsers, pageNumber } = this.props;
    getUsers(pageNum, pageNumber);
  };

  render() {
    const {
      isFetching,
      totalUsersCount,
      pageSize,
      currentPage,
      users,
      follow,
      unFollow,
      followingInProgress,
    } = this.props;
    return (
      <>
        {isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={this.onPageChanged}
            users={users}
            follow={follow}
            unFollow={unFollow}
            followingInProgress={followingInProgress}
          />
        )}
      </>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    toggleFolowingProgress,
    getUsers,
  })
)(UsersContainer);
