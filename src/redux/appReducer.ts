import { getAuthUserData } from './authReducer.ts';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccesActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSucces = (): InitializedSuccesActionType => ({
  type: INITIALIZED_SUCCESS,
});

export const initialize = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  return promise.then(() => {
    dispatch(initializedSucces());
  });
};
