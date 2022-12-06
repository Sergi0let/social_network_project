import {
  compose,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Action,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

// @ts-ignore
import authReducer from './authReducer.ts'; // @ts-ignore
import dialogsReducer from './dialogsReducer.ts'; // @ts-ignore
import profileReducer from './profileReducer.ts'; // @ts-ignore
import sidebarReducer from './sidebarReducer.ts'; // @ts-ignore
import usersReducer from './usersReducer.ts'; // @ts-ignore
import appReducer from './appReducer.ts';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagePage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
// # 2 type
// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type InferActionTypes<
//   T extends { [key: string]: (...args: any[]) => any }
// > = ReturnType<PropertiesTypes<T>>;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
