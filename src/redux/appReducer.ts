// @ts-ignore
import { getAuthUserData } from './authReducer.ts'; // @ts-ignore
import { InferActionTypes } from './store-redux.ts';

const initialState = {
  initialized: false,
};
export type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS': {
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

export const actions = {
  initializedSucces: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' as const }),
};

export const initialize = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => dispatch(actions.initializedSucces()));
  // return promise.then(() => {
  //   dispatch(actions.initializedSucces());
  // });
};
