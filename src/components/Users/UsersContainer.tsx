import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  follow,
  unFollow,
  getUsers,
  // @ts-ignore
} from '../../redux/usersReducer.ts';
// @ts-ignore
import Users from './Users.tsx';
import Preloader from '../common/preloader/Preloader';
import {
  getPageSize,
  getUsersSelector,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  // @ts-ignore
} from '../../redux/usersSelectors.ts';

import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/store-redux';

type MapStateToPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};
type MapDispatchPropsType = {
  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
  pageNumber: number;
};

type PropsType = MapDispatchPropsType & MapStateToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { getUsers, currentPage, pageNumber } = this.props;
    getUsers(currentPage, pageNumber);
  }

  onPageChanged = (pageNum: number) => {
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
        <h2>{this.props.pageTitle}</h2>
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
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
  connect<
    MapStateToPropsType,
    MapDispatchPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    follow,
    unFollow,
    getUsers,
  })
)(UsersContainer);
