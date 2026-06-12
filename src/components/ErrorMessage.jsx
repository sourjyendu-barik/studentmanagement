// ErrorMessage.jsx
import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <p className="text-danger fw-bold m-0 p-2 text-center">
      ⚠️ {message || "An error occurred. Please try again."}
    </p>
  );
}
