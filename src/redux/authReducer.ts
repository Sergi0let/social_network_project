import { stopSubmit } from 'redux-form';
// @ts-ignore
import { ResultCodeEnum } from '../api/api.ts'; // @ts-ignore
import { authAPI } from '../api/auth-api.ts';
import { BaseThunkType, InferActionTypes } from './store-redux';

export const initialState = {
  userId: null as null | number,
  email: null as string | null,
  login: null as string | null,
  isFetching: false as boolean,
  isAuth: false as boolean,
};

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH_SET_USER_DATA': {
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

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'AUTH_SET_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let authData = await authAPI.getAuth();
  if (authData.resultCode === ResultCodeEnum.Succes) {
    let { id, email, login } = authData.data;

    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): ThunkType =>
  async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);

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
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType;

// captha don't work
// export const getCaptchaUrl = () => async (dispatch: any) => {
//   const data = await securityAPI.getCaptchaUrl();
//   const captchaUrl = data.url;
//   // dispatch(getCaptchaUrlSucces(captchaUrl));
// };
