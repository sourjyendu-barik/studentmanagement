import React from "react";
import { Link } from "react-router";
const StudentListCards = ({ students }) => {
  return (
    <ol className="list-group">
      {students.map(({ _id, name, studentClass }) => (
        <li
          key={_id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{name}</strong>
            <span className="text-muted ms-2">
              (Class: {studentClass ? studentClass : "Not added yet"})
            </span>
          </div>

          <Link
            to={`/studentDetail/${_id}`}
            className="btn btn-outline-primary btn-sm rounded-pill"
          >
            View Details
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default StudentListCards;
