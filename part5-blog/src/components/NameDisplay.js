import React from 'react';
import PropTypes from 'prop-types';

const NameDisplay = ({ fullName }) => (
  <p>
    {fullName} is logged in
  </p>
);

NameDisplay.propTypes = {
  fullName: PropTypes.string.isRequired
};

export default NameDisplay;
