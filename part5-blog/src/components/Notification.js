import React from 'react';
import { Alert } from '@material-ui/lab';

const Notification = ({ msg, isError }) => (
  <Alert severity={isError ? 'error' : 'success'}>
    {msg}
  </Alert>
);

export default Notification;
