import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
// @ts-ignore
import { authAPI, ResultCodeEnum } from '../api/api.ts';
import { AppStateType } from './store-redux';

const SET_USER_DATA = 'AUTH_SET_USER_DATA';

export const initialState = {
  userId: null as null | string,
  email: null as string | null,
  login: null as string | null,
  isFetching: false as boolean,
  isAuth: false as boolean,
};

export type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
export default authReducer;

type ActionTypes = SetAuthUserDataActionType;

type SetAuthUserDataActionPayloadType = {
  userId: string | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: string | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const authData = await authAPI.getAuth();
  if (authData.resultCode === ResultCodeEnum.Succes) {
    let { id, email, login } = authData.data;

    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean
  ): ThunkAction<void, AppStateType, unknown, ActionTypes | any> =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe);
    console.log(data);
    if (data.resultCode === ResultCodeEnum.Succes) {
      dispatch(getAuthUserData());
    } else {
      let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.Succes) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
