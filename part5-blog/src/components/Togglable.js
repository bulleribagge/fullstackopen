import React, { useState, useImperativeHandle } from 'react';
import { Button } from '@material-ui/core';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={visible ? { display: 'none' } : { display: '' }}>
        <Button onClick={() => toggleVisibility()}>{props.buttonLabel}</Button>
      </div>
      <div style={visible ? { display: '' } : { display: 'none' }}>
        {props.children}
        <Button onClick={() => toggleVisibility()}>cancel</Button>
      </div>
    </div>
  );
});

export default Togglable;