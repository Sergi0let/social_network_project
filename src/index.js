import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import store from './components/redux/store-redux';
import App from './App';
import { Provider } from 'react-redux';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireModeTree = (state) => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App
          state={state}
          dispatch={store.dispatch.bind(store)}
          store={store}
        />
      </Provider>
    </React.StrictMode>
  );
};

rerenderEntireModeTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireModeTree(state);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
