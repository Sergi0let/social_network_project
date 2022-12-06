import { Dispatch } from 'react';
// @ts-ignore
import { usersAPI } from '../api/users-api.ts';
import { UserType } from '../types/types.js';
// @ts-ignore
import { updatedObjectInArray } from '../utils/object-helper/object-helper.ts';
import { BaseThunkType, InferActionTypes } from './store-redux';

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
    case 'FOLLOW':
      return {
        ...state,
        users: updatedObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: updatedObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      };
    case 'SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage };
    }
    case 'SET_TOTAL_COUNT': {
      return { ...state, totalUsersCount: action.count };
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching };
    }
    case 'TOGGLE_IS_FOLOWING_PROGRESS': {
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

type ActionTypes = InferActionTypes<typeof actions>;

export const actions = {
  followSucces: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),

  unFollowSucces: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_COUNT',
      count: totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFolowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'TOGGLE_IS_FOLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
};

type ThunkType = BaseThunkType<ActionTypes>;

export const getUsers = (
  currentPage: number,
  pageNumber: number
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageNumber);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionTypes
) => {
  dispatch(actions.toggleFolowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFolowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    // dispatch(toggleFolowingProgress(true, userId));
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.getFolowed.bind(usersAPI),
      actions.followSucces
    );
  };
};
export const unFollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.getUnFolowed.bind(usersAPI),
      actions.unFollowSucces
    );
  };
};
