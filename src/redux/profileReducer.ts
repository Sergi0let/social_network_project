import { stopSubmit } from 'redux-form'; // @ts-ignore
import { profileApi } from '../api/profile-api.ts';

import { PostDataType, ProfileType, PhotosType } from '../types/types';
import { AppStateType } from './store-redux';
import { ThunkAction } from 'redux-thunk';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USERp_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';

const initialState = {
  postsData: [
    { id: 1, message: 'Hi, how are you?', likesCout: 1 },
    { id: 2, message: "It's my first post", likesCout: 21 },
    { id: 3, message: 'Thanks, I am fine', likesCout: 3 },
    { id: 4, message: "It's my first post", likesCout: 1 },
  ] as Array<PostDataType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCout: 10,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: '',
      };
    }

    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case SAVE_PHOTO_SUCCES: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export default profileReducer;

type ActionTypes =
  | AddPostActionCreatorType
  | SetUserProfileType
  | SetStatusType
  | SavePhotoSuccesType;

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});

type SavePhotoSuccesType = {
  type: typeof SAVE_PHOTO_SUCCES;
  photos: PhotosType;
};
export const savePhotoSucces = (photos: PhotosType): SavePhotoSuccesType => ({
  type: SAVE_PHOTO_SUCCES,
  photos,
});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch, getState) => {
    const response = await profileApi.getProfile(userId);
    dispatch(setUserProfile(response.data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.getStatus(userId);
    dispatch(setStatus(response.data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };

export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSucces(response.data.photos));
    }
  };

export const saveProfile =
  (
    profile: ProfileType
  ): ThunkAction<void, AppStateType | any, unknown, ActionTypes | any> =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileApi.saveProfile(profile);

    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(
        stopSubmit('edit-profile', { _error: response.data.messages[0] })
      );
      return Promise.reject(response.data.messages[0]);
    }
  };
// contacts: { facebook: response.data.messages[0] },
