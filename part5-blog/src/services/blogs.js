import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/blogs`, config);
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

const likeBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${baseUrl}/blogs/${blog.id}`,
    {
      likes: blog.likes + 1
    }, config);

  console.log('returning user after like', response.data);
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

export default { getAll, addBlog, likeBlog, deleteBlog };
