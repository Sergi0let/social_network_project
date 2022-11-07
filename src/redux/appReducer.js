import { getAuthUserData } from './authReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

export default appReducer;

export const initializedSucces = () => ({ type: INITIALIZED_SUCCESS });

export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  return promise.then(() => {
    dispatch(initializedSucces());
  });
};
