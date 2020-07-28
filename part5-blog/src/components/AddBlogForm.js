import React from 'react';
import { useField } from '../hooks/index';
import Input from './Input';
import { Button } from '@material-ui/core';

const AddBlogForm = ({ handleAddBlog }) => {
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');

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
    <form>
      <div>
        <Input {...title} />
      </div>
      <div>
        <Input {...author} />
      </div>
      <div>
        <Input {...url} />
      </div>
      <Button type="button" onClick={(e) => handleSubmit(e)}>save</Button>
    </form>
  );
};

export default AddBlogForm;
