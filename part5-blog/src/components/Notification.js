import React from 'react';

const Notification = ({ msg, isError }) => (
  <div className={isError ? 'error' : 'notification'}>
    {msg}
  </div>
);

export default Notification;
