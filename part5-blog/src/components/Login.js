import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

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
        <TextField label="username" value={username} onChange={(e) => onChangeUsername(e)} />
        {/* <input type="text" name="username" value={username} onChange={(e) => onChangeUsername(e)} /> */}
      </div>
      <div>
        <TextField label="password" value={password} type="password" onChange={(e) => onChangePassword(e)} />
        {/* <input type="password" name="password" value={password} onChange={(e) => onChangePassword(e)} /> */}
      </div>
      <Button variant="contained" color="primary" onClick={() => handleSubmit()}>login</Button>
    </div>
  );
};

export default Login;
