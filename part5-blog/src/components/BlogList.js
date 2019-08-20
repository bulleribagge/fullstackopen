import React from 'react';
import Blog from './Blog';

const BlogList = ({ user, blogs, handleLike, handleDelete }) => (
  <div>
    <ul>
      {blogs && blogs.map((b) => (
        <Blog user={user} blog={b} key={b.title} handleLike={handleLike} handleDelete={handleDelete} />
      ))}
    </ul>
  </div>
);

export default BlogList;
