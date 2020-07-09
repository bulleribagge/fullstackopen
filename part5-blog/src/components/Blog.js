import React, { useState } from 'react';

const Blog = ({ user, blog, handleLike, handleDelete }) => {

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '3px',
    cursor: 'pointer'
  };

  return (
    <div style={blogStyle} className="blog">
      <div onClick={() => toggleExpanded()} className='titleAuthor'>
        {blog.title} {blog.author}
      </div>
      <div style={expanded ? { display: '' } : { display: 'none' }} className='expandDiv'>
        {blog.url} <br/>
        {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button><br/>
      Added by {blog.user.name}<br/>
        <button onClick={() => handleDelete(blog.id)} style={user.id === blog.user ? { display: '' } : { display: 'none' }}>remove</button>
      </div>
    </div>
  );};

export default Blog;
