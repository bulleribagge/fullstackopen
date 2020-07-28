import React from 'react';
import PropTypes from 'prop-types';

const NameDisplay = ({ fullName }) => (
  <span style={{ padding: "5px" }}>
    {fullName} is logged in
  </span>
);

NameDisplay.propTypes = {
  fullName: PropTypes.string.isRequired
};

export default NameDisplay;
