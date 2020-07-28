import React from 'react';
import BlogListItem from './BlogListItem';
import { List } from '@material-ui/core';

const BlogList = ({ user, blogs, handleLike, handleDelete }) => (
  <div>
    <List>
      {blogs && blogs.map((b) => (
        <BlogListItem user={user} blog={b} key={b.title} handleLike={handleLike} handleDelete={handleDelete} />
      ))}
    </List>
  </div>
);

export default BlogList;
