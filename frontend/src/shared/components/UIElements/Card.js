import React from 'react';

import './Card.css';

const Card = props => {
  console.log("card :: ", props)
  console.log("card :: ", props.children)
  return (
    <div className={ `card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
