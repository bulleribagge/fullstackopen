import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/blogs/all`, config);
  return response.data;
};

const addBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${baseUrl}/blogs`, blog, config);
  return response.data;
};

const updateBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${baseUrl}/blogs/${blog.id}`,
    {
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }, config);

  return response.data;
};

const deleteBlog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`${baseUrl}/blogs/${id}`, config);
};

export default { getAll, addBlog, updateBlog, deleteBlog };
