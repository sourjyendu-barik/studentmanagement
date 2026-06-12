import React from "react";

const InputBox = ({ placeholder, value, name, type = "text", onChange }) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        className="form-control"
        required
      />
    </div>
  );
};

export default InputBox;
