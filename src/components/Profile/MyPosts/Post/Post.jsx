import React from 'react';

import s from './Post.module.scss';

const Post = (props) => {
  return (
    <div key={props.id} className={s.item}>
      <img
        src="https://cdn.shopify.com/s/files/1/1052/2158/products/55519_ATLA_AangAirBending_POP_GLAM-WEB_-_Copy.png?v=1638480833"
        alt="avatar"
      />
      {props.message}
      <div>
        <span>Like </span>
        {`${props.like ? props.like : '0'}`}
      </div>
    </div>
  );
};

export default Post;
