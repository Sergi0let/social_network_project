// @ts-ignore
import { AppStateType } from './store-redux.ts';

export const getUsersSelector = (state: AppStateType) => state.usersPage.users;
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppStateType) =>
  state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppStateType) =>
  state.usersPage.currentPage;
export const getIsFetching = (state: AppStateType) =>
  state.usersPage.isFetching;
export const getFollowingInProgress = (state: AppStateType) =>
  state.usersPage.followingInProgress;
