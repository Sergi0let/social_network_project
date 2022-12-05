import { connect } from 'react-redux';

import MyPosts from './MyPosts';
import { actions } from '../../../redux/profileReducer.ts';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) =>
      dispatch(actions.addPostActionCreator(newPostText)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
