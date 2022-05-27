import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function HeroButton({  className, text }) {
  return (
    <Link to="/produkter">
      <button href="/produkter" className={className}>{text}</button>
    </Link>
  );
}

HeroButton.propTypes = {
  class: PropTypes.string,
  text: PropTypes.string,
};

export default HeroButton;