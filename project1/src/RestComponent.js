//RestComponent.js
import React from "react";

function RestComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.price_level}</h2>
      <p>{props.rating}</p>
    </div>
  );
}

export default RestComponent;
