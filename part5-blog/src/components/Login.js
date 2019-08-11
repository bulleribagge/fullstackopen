import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    handleLogin(username, password);
  };

  return (
    <div>
      <div>
        <label>
          username
          <input type="text" name="username" value={username} onChange={(e) => onChangeUsername(e)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input type="password" name="password" value={password} onChange={(e) => onChangePassword(e)} />
        </label>
      </div>
      <button type="button" onClick={() => handleSubmit()}>login</button>
    </div>
  );
};

export default Login;
