import React from "react";

const ClassSelect = ({
  label,
  value,
  onChange,
  name = "studentClass",
  all,
}) => {
  return (
    <div className="mb-2">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        <option disabled value="">
          Select class
        </option>
        {all && <option value="All">All students</option>}

        {[...Array(12)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            Class {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassSelect;
