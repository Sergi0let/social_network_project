import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
// @ts-ignore
import { usersAPI } from '../api/api.ts';
import { UserType } from '../types/types.js';
import { updatedObjectInArray } from '../utils/object-helper/object-helper.js';
import { AppStateType } from './store-redux';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLOWING_PROGRESS = 'TOGGLE_IS_FOLOWING_PROGRESS';

const initialState = {
  users: [] as Array<UserType>,
  newPostText: '',
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // arrays of users ids
  followed: false,
};

type InitialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updatedObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updatedObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_IS_FOLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

export default usersReducer;

type ActionTypes =
  | FollowSuccesType
  | UnFollowSuccesType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalCountType
  | ToggleIsFetchingType
  | ToggleFolowingProgressType;

type FollowSuccesType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSucces = (userId: number): FollowSuccesType => ({
  type: FOLLOW,
  userId,
});

type UnFollowSuccesType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unFollowSucces = (userId: number): UnFollowSuccesType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalCountType = {
  type: typeof SET_TOTAL_COUNT;
  count: number;
};
export const setTotalCount = (totalUsersCount: number): SetTotalCountType => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount,
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFolowingProgressType = {
  type: typeof TOGGLE_IS_FOLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFolowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFolowingProgressType => ({
  type: TOGGLE_IS_FOLOWING_PROGRESS,
  isFetching,
  userId,
});

type DispatchType = Dispatch<ActionTypes>;
// type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;

export const getUsers = (
  currentPage: number,
  pageNumber: number
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageNumber);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccesType | UnFollowSuccesType
) => {
  dispatch(toggleFolowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFolowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    // dispatch(toggleFolowingProgress(true, userId));
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.getFolowed.bind(usersAPI),
      followSucces
    );
  };
};
export const unFollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.getUnFolowed.bind(usersAPI),
      unFollowSucces
    );
  };
};
