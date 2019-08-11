import React from 'react';

const LogoutButton = ({ handleLogout }) => (
  <button type="button" onClick={() => handleLogout()}>logout</button>
);

export default LogoutButton;
