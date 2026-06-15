import React from "react";

const InputBox = ({ placeholder, value, name, type = "text", onChange }) => {
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="mb-3">
      <label>{capitalize(name)} :</label>
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
