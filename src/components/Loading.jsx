// Loader.jsx
import React from "react";

export default function Loading({ message }) {
  return (
    <div className="d-flex flex-column  align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-3">{message}</p>
    </div>
  );
}
