import React, { useState } from 'react';

const AddBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBlog({
      title: title,
      author: author,
      url: url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form style={{ marginTop: '10px' }}>
      <div>
        <label>
          title
          <input type="text" name="title" value={title} onChange={(e) => handleChangeTitle(e)}></input>
        </label>
      </div>
      <div>
        <label>
          author
          <input type="text" name="author" value={author} onChange={(e) => handleChangeAuthor(e)}></input>
        </label>
      </div>
      <div>
        <label>
          url
          <input type="text" name="url" value={url} onChange={(e) => handleChangeUrl(e)}></input>
        </label>
      </div>
      <button type="button" onClick={(e) => handleSubmit(e)}>save</button>
    </form>
  );
};

export default AddBlogForm;
