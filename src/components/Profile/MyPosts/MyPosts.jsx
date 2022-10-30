import React from 'react';
import Post from './Post/Post';

import s from './MyPosts.module.scss';
import { Field, reduxForm } from 'redux-form';

let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.postsText}>
      <Field
        component="textarea"
        placeholder="write you post"
        name="newPostText"
      />
      <button>Add post</button>
    </form>
  );
};

AddNewPostForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);

const MyPosts = (props) => {
  const postsElement = props.posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      message={post.message}
      like={post.likesCout}
    />
  ));

  const onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      My posts
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElement}</div>
    </div>
  );
};

export default MyPosts;
