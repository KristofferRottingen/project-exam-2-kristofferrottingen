import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function GetProducts({ id, img, title, pris}) {
  return (
    <Link to={`/detail/${id}`} className='product-card'>
      <img src={img} alt={title}></img>
      <h4>{title}</h4>
      <p>{pris}</p>
    </Link>
  );
}

GetProducts.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pris: PropTypes.string.isRequired,
}

export default GetProducts;