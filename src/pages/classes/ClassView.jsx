import React from "react";
import SectionContainer from "../../components/SectionContainer";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../students/studentsSlice";
const ClassView = () => {
  const studentsList = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { students, status, error, filter, sortBy } = studentsList;

  if (status === "loading") {
    return <Loading message={"Students data is loading......."} />;
  }
  if (status === "error") {
    return <ErrorMessage message={error} />;
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
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "marks":
        return a.marks - b.marks;
      case "attendance":
        return a.attendance - b.attendance;
        return 0;
    }
  });
  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };
  const handleSort = (e) => {
    dispatch(setSortBy(e.target.value));
  };
  return (
    <>
      <SectionContainer>
        <h1>Class view</h1>
        <div className="mb-2">
          <label className="me-2" htmlFor="gender">
            Filter By Gender :
          </label>
          <select name="gender" id="gender" onChange={handleFilter}>
            {/* <option value="Male">Male</option>
            <option value="Female">Female</option> */}
            <option value="All">All</option>
            <option value="Male">Boys</option>
            <option value="Female">Girls</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="me-2" htmlFor="sort">
            Sort By :
          </label>
          <select name="sort" id="sort" onChange={handleSort}>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
      </SectionContainer>
      <SectionContainer>
        {sortedStudents.map((s) => {
          const { _id, name, gender, marks, attendance } = s;
          return (
            <li key={`student___${_id}`}>
              <p>
                {name} - {gender} - Marks:{marks} - Attendance: {attendance}%
              </p>
            </li>
          );
        })}
      </SectionContainer>
    </>
  );
};

export default ClassView;
