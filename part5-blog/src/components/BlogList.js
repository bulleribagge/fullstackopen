import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs }) => (
  <div>
    <ul>
      {blogs && blogs.map((b) => (
        <Blog blog={b} key={b.title} />
      ))}
    </ul>
  </div>
);

export default BlogList;
