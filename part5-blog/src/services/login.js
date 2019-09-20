import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const login = async (username, password) => {
  const res = await axios.post(`${baseUrl}/login`, { username, password });

  return res.data;
};

export default { login };
