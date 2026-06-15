import React from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import SectionContainer from "./SectionContainer";
import { useDispatch } from "react-redux";
import {
  setFilter,
  setSortBy,
  setClass,
} from "../pages/students/studentsSlice";
import RefetechStudents from "./RefetechStudents";
import ClassSelect from "./ClassSelect";
import StudentListCards from "./StudentListCards";
const StudentList = ({ studentsList }) => {
  // const { students, status, error } = studentsList;
  // //console.log("students list is", studentsList);
  // if (status === "loading") {
  //   return <Loading message={"Students data is loading......."} />;
  // }
  // if (status === "error") {
  //   return <ErrorMessage message={error} />;
  // }
  //const studentsList = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { students, status, error, filter, sortBy, studentClassFilter } =
    studentsList;

  if (status === "loading") {
    return <Loading message={"Students data is loading......."} />;
  }
  if (status === "error") {
    return <ErrorMessage message={error} />;
  }
  if (students.length === 0) {
    // console.log("runnig");
    return (
      <div className="container">
        <p>No students available</p>
        <RefetechStudents />
      </div>
    );
  }
  const filteredStudents = students.filter((s) => {
    if (filter === "Male") {
      return s.gender === "Male";
    }
    if (filter === "Female") {
      return s.gender === "Female";
    }
    return true;
  });
  // console.log(students);
  // console.log(filteredStudents);
  const filteredClassStudents = filteredStudents.filter((s) => {
    if (studentClassFilter === "All") {
      return true;
    }
    return s.studentClass === Number(studentClassFilter);
  });
  const sortedStudents = [...filteredClassStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "marks":
        return a.marks - b.marks;
      case "attendance":
        return a.attendance - b.attendance;
      case "attendance-highToLow":
        return b.attendance - a.attendance;
      case "marks-highToLow":
        return b.marks - a.marks;
      case "name-z-a":
        return b.name.localeCompare(a.name);
        return 0;
    }
  });
  if (sortedStudents.length === 0) {
    return <p className="container">Currently No students in this class</p>;
  }
  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };
  const handleSort = (e) => {
    dispatch(setSortBy(e.target.value));
  };
  const handleClass = (e) => {
    dispatch(setClass(e.target.value));
  };
  //console.log(sortedStudents);
  return (
    <>
      <SectionContainer>
        <div className="mb-2">
          <label className="form-label" htmlFor="gender">
            Filter By Gender :
          </label>
          <select
            className="form-select"
            name="gender"
            id="gender"
            onChange={handleFilter}
          >
            {/* <option value="Male">Male</option>
            <option value="Female">Female</option> */}
            <option value="All">All</option>
            <option value="Male">Boys</option>
            <option value="Female">Girls</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="sort">
            Sort By :
          </label>
          <select
            className="form-select"
            name="sort"
            id="sort"
            onChange={handleSort}
          >
            <option value="name">Name(A to Z)</option>
            <option value="marks">Marks(Low to High)</option>
            <option value="attendance">Attendance(Low to High)</option>
            <option value="name-z-a">Name(Z to A)</option>
            <option value="marks-highToLow">Marks(High to Low)</option>
            <option value="attendance-highToLow">
              Attendance(High to Low)
            </option>
          </select>
        </div>
        <ClassSelect
          name={"studentByClass"}
          value={studentClassFilter}
          onChange={handleClass}
          label="Filter By Class"
          all={true}
        />
      </SectionContainer>
      <SectionContainer>
        <h2>Student List({sortedStudents.length})</h2>
        {/* <ol className="list-group">
          {sortedStudents.map(({ _id, name, studentClass }) => (
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
        </ol> */}
        <StudentListCards students={sortedStudents} />
      </SectionContainer>
    </>
  );
};

export default StudentList;
