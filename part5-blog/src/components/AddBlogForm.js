import React from 'react';
import { useField } from '../hooks/index';
import Input from './Input';

const AddBlogForm = ({ handleAddBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBlog({
      title: title.value,
      author: author.value,
      url: url.value
    });
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <form style={{ marginTop: '10px' }}>
      <div>
        <label>
          title
          <Input {...title} />
        </label>
      </div>
      <div>
        <label>
          author
          <Input {...author} />
        </label>
      </div>
      <div>
        <label>
          url
          <Input {...url} />
        </label>
      </div>
      <button type="button" onClick={(e) => handleSubmit(e)}>save</button>
    </form>
  );
};

export default AddBlogForm;
