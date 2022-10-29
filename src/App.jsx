import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';

import './App.scss';

const App = (props) => {
  return (
    <div className="app">
      <BrowserRouter>
        <HeaderContainer />
        <div className="app__main">
          <Navbar state={props.state.sidebar} />
          <div className="app__content content">
            <div className="content__img-bg"></div>
            <Routes>
              <Route path="/profile" element={<ProfileContainer />} />
              <Route
                path="/profile/:profileId"
                element={
                  <ProfileContainer
                    dispatch={props.dispatch}
                    store={props.store}
                  />
                }
              />
              <Route
                path="/dialogs/*"
                element={
                  <DialogsContainer
                    store={props.store}
                    dispatch={props.dispatch}
                  />
                }
              />
              <Route path="/users/*" element={<UsersContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
