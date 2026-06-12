import React from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router";
const StudentList = ({ studentsList }) => {
  const { students, status, error } = studentsList;
  //console.log("students list is", studentsList);
  if (status === "loading") {
    return <Loading message={"Students data is loading......."} />;
  }
  if (status === "error") {
    return <ErrorMessage message={error} />;
  }
  return (
    // <ul className="list-group">
    //   {students.map((s) => (
    //     <li key={`student${s._id}`}>
    //       <Link to={`/studentDetail/${s._id}`} className="list-group-item">
    //         {" "}
    //         {s.name}(Age:{s.age})
    //       </Link>
    //     </li>
    //   ))}
    // </ul>
    <ul className="list-group">
      {students.map((s) => (
        <li
          key={s._id}
          className="list-group-item border-0 mb-3 shadow-sm rounded"
          style={{ width: "300px" }}
        >
          <Link
            to={`/studentDetail/${s._id}`}
            className="text-decoration-none d-flex justify-content-between align-items-center w-75"
          >
            <div>
              <h5 className="mb-1 text-dark">{s.name}</h5>
              <small className="text-muted">Age: {s.age}</small>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
