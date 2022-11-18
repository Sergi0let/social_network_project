import { profileApi, usersAPI } from '../api/api';

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
  ],
  profile: null,
  status: 'rex',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCout: 10,
      };
      return {
        ...state,
        newPostText: '',
        postsData: [...state.postsData, newPost],
      };
    }

    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case SAVE_PHOTO_SUCCES: {
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }
    default:
      return state;
  }
};

export default profileReducer;

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const savePhotoSucces = (photos) => ({
  type: SAVE_PHOTO_SUCCES,
  photos,
});

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileApi.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileApi.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.photos));
  }
};

export const saveProfile = (profile) => async (dispatch) => {
  const response = await profileApi.saveProfile(profile);
  debugger;
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.photos));
  }
};
