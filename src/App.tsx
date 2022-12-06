import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings'; // @ts-ignore
import UsersContainer from './components/Users/UsersContainer.tsx'; // @ts-ignore
import Login from './components/Login/Login.tsx'; // @ts-ignore
import { initialize } from './redux/appReducer.ts';
import Preloader from './components/common/preloader/Preloader';

import './App.scss';
import { AppStateType } from './redux/store-redux';

const DialogsContainer = React.lazy(
  // @ts-ignore
  () => import('./components/Dialogs/DialogsContainer.tsx')
);
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer')
);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    alert('Some error');
  };
  componentDidMount() {
    this.props.initialize();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandleErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app">
        <BrowserRouter>
          <HeaderContainer />
          <div className="app__main">
            <Navbar />
            <div className="app__content content">
              <div className="content__img-bg"></div>
              <Routes>
                <Route
                  path="/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ProfileContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/profile/:profileId"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ProfileContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/dialogs/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <DialogsContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/users/*"
                  element={<UsersContainer pageTitle={'Social Network'} />}
                />
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
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};

export default connect(mapStateToProps, { initialize })(App);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initialize: () => void;
};
