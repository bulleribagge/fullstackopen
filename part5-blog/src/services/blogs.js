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
}

export default { getAll, addBlog };
