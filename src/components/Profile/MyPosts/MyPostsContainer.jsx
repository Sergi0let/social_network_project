import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from '../../redux/profileReducer';
import { connect } from 'react-redux';

import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => dispatch(addPostActionCreator()),
    onPostChange: (text) => dispatch(updateNewPostActionCreator(text)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
