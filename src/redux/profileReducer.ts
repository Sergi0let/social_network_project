import { FormAction, stopSubmit } from 'redux-form'; // @ts-ignore
import { profileApi } from '../api/profile-api.ts';

import { PostDataType, ProfileType, PhotosType } from '../types/types';
import { AppStateType, BaseThunkType, InferActionTypes } from './store-redux';
import { ThunkAction } from 'redux-thunk';

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

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
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

    case 'SET_USER_PROFILE': {
      return { ...state, profile: action.profile };
    }
    case 'SET_STATUS': {
      return { ...state, status: action.status };
    }
    case 'SAVE_PHOTO_SUCCES': {
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

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'ADD_POST',
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'SET_USER_PROFILE',
      profile,
    } as const),

  setStatus: (status: string) =>
    ({
      type: 'SET_STATUS',
      status,
    } as const),
  savePhotoSucces: (photos: PhotosType) =>
    ({
      type: 'SAVE_PHOTO_SUCCES',
      photos,
    } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch, getState) => {
    const response = await profileApi.getProfile(userId);
    dispatch(actions.setUserProfile(response));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.getStatus(userId);
    dispatch(actions.setStatus(response));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.updateStatus(status);
    if (response.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.savePhoto(file);
    if (response.resultCode === 0) {
      dispatch(actions.savePhotoSucces(response.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileApi.saveProfile(profile);

    if (response.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }));
      return Promise.reject(response.messages[0]);
    }
  };
// contacts: { facebook: response.data.messages[0] },

type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
