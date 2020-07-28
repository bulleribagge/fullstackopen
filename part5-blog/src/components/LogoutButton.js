import React from 'react';
import { Button } from '@material-ui/core';

const LogoutButton = ({ handleLogout }) => (
  <Button onClick={() => handleLogout()}>logout</Button>
);

export default LogoutButton;
