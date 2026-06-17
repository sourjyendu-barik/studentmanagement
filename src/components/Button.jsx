import React from "react";

const Button = ({
  color = "primary",
  name,
  type = "button",
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${color} ${className}`}
      onClick={onClick}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
