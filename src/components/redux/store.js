import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: 'Hi, how are you?', likesCout: 1 },
        { id: 2, message: "It's my first post", likesCout: 21 },
        { id: 3, message: 'Thanks, I am fine', likesCout: 3 },
        { id: 4, message: "It's my first post", likesCout: 1 },
      ],
      newPostText: 'write you post',
    },
    messagePage: {
      messagesData: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you' },
        { id: 3, message: 'Thanks, I am fine' },
        { id: 4, message: 'Lorem ipsum dolor sit.' },
      ],
      dialogsData: [
        { id: 1, name: 'Brosik' },
        { id: 2, name: 'Salem' },
        { id: 3, name: 'Rex' },
        { id: 4, name: 'Jedi' },
        { id: 5, name: 'Jedi' },
        { id: 6, name: 'Lexx' },
        { id: 7, name: 'Le' },
        { id: 8, name: 'you' },
      ],
      newMessageBody: '',
    },
    sidebar: {
      userFriends: [
        { id: 1, name: 'Brosik' },
        { id: 2, name: 'Salem' },
        { id: 3, name: 'Rex' },
      ],
    },
  },
  _callSubscriber() {
    console.log('State is changes');
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagePage = dialogsReducer(this._state.messagePage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

// window.state = store;

export default store;
