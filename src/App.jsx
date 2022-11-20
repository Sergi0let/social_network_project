import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';

import { initialize } from './redux/appReducer.ts';
import Preloader from './components/common/preloader/Preloader';

import './App.scss';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

class App extends React.Component {
  catchAllUnhandleErrors = (reason, promise) => {
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
            <Navbar state={this.props.state.sidebar} />
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
                      <ProfileContainer
                        dispatch={this.props.dispatch}
                        store={this.props.store}
                      />
                    </Suspense>
                  }
                />
                <Route
                  path="/dialogs/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <DialogsContainer
                        store={this.props.store}
                        dispatch={this.props.dispatch}
                      />
                    </Suspense>
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
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

export default connect(mapStateToProps, { initialize })(App);
