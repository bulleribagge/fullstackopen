import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';

const BlogListItem = ({ blog }) => {

  return (
    <ListItem>
        <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
    </ListItem>
  );
};

export default BlogListItem;
