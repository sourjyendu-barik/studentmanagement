import React from "react";

const Button = ({ color = "primary", name, type = "button", onClick }) => {
  return (
    <button type={type} className={`btn btn-${color}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
