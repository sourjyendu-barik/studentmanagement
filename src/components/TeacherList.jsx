import React from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router";
const TeacherList = ({ teacherList }) => {
  const { teachers, fetchStatus, error } = teacherList;
  if (fetchStatus === "loading") {
    return <Loading message={"Teachers data is loading......."} />;
  }
  if (status === "error") {
    return <ErrorMessage message={error} />;
  }
  return (
    // <ul className="list-group">
    //   {teachers.map((t) => (
    //     <li
    //       key={t._id}
    //       className="list-group-item border-0 mb-3 shadow-sm rounded"
    //       style={{ width: "300px" }}
    //     >
    //       <Link
    //         to={`/teacherDetail/${t._id}`}
    //         className="text-decoration-none d-flex justify-content-between align-items-center w-75"
    //       >
    //         <div>
    //           <h5 className="mb-1 text-dark">{t.name}</h5>
    //           <small className="text-muted">Age: {t.age}</small>
    //         </div>
    //       </Link>
    //     </li>
    //   ))}
    // </ul>
    <div className="row">
      {teachers.map((t) => (
        <div key={t._id} className="col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold text-dark">{t.name}</h5>
              <p className="card-text text-muted mb-4">
                Age: <span className="fw-semibold">{t.age}</span>
              </p>
              <Link
                to={`/teacherDetail/${t._id}`}
                className="btn btn-primary w-50"
              >
                View Details
              </Link>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherList;
