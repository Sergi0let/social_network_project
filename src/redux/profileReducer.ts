import { stopSubmit } from 'redux-form';
import { profileApi, usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USERp_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';

type PostDataType = { id: number; message: string; likesCout: number };

type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

type PhotosType = {
  small: string | null;
  large: string | null;
};
type ProfileType = {
  userId: number;
  lookingForAJobDescription: boolean;
  lookingForAJob: boolean;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

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

export type InitialStateType = typeof initialState;

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

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileApi.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileApi.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.photos));
  }
};

export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
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
