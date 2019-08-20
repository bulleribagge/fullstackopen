import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={visible ? { display: 'none' } : { display: '' }}>
        <button onClick={() => toggleVisibility()}>{props.buttonLabel}</button>
      </div>
      <div style={visible ? { display: '' } : { display: 'none' }}>
        {props.children}
        <button onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;