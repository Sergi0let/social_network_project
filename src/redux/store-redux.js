import {
  compose,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer.ts';
import dialogsReducer from './dialogsReducer.ts';
import profileReducer from './profileReducer.ts';
import sidebarReducer from './sidebarReducer.ts';
import usersReducer from './usersReducer.ts';
import appReducer from './appReducer.ts';

let reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
