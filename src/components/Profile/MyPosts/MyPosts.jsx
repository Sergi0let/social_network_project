import React from 'react';
import Post from './Post/Post';

import s from './MyPosts.module.scss';

const MyPosts = (props) => {
  const postsElement = props.posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      message={post.message}
      like={post.likesCout}
    />
  ));

  let newPostElement = React.createRef();

  const onAddPost = () => {
    props.addPost();
  };

  const onPostChange = () => {
    let text = newPostElement.current.value;
    props.onPostChange(text);
  };

  return (
    <div className={s.postsBlock}>
      My posts
      <div className={s.postsText}>
        <textarea
          ref={newPostElement}
          cols="60"
          rows="5"
          value={props.newPostText}
          placeholder={'write you post'}
          onChange={onPostChange}
        />
        <button onClick={onAddPost}>Add post</button>
        <button>Remove</button>
      </div>
      <div className={s.posts}>{postsElement}</div>
    </div>
  );
};

export default MyPosts;
