import { usersAPI } from '../api/api.js';
import { updatedObjectInArray } from '../utils/object-helper/object-helper.js';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLOWING_PROGRESS = 'TOGGLE_IS_FOLOWING_PROGRESS';

const initialState = {
  users: [],
  newPostText: '',
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};
const usersReducer = (state = initialState, action) => {
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
          : [...state.followingInProgress.filter((id) => id !== action.userId)],
      };
    }
    default:
      return state;
  }
};

export default usersReducer;

export const followSucces = (userId) => ({ type: FOLLOW, userId });
export const unFollowSucces = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalCount = (totalUsersCount) => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFolowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsers = (currentPage, pageNumber) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageNumber);
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFolowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    dispatch(toggleFolowingProgress(true, userId));
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.getFolowed.bind(usersAPI),
      followSucces
    );
  };
};
export const unFollow = (userId) => {
  return async (dispatch) => {
    dispatch(toggleFolowingProgress(true, userId));
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.getUnFolowed.bind(usersAPI),
      unFollowSucces
    );
  };
};
