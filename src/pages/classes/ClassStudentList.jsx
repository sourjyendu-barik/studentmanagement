import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import SectionContainer from "../../components/SectionContainer";
import StudentListCards from "../../components/StudentListCards";

const ClassStudentList = () => {
  const { className } = useParams();
  const filteredStudents = useSelector(
    (state) => state.students.students,
  ).filter((s) => {
    // console.log(s.studentClass, className);
    return `Class ${s.studentClass}` == className;
  });
  //   console.log(filteredStudents);
  //console.log(className);
  return (
    <SectionContainer>
      <h1>Students of class {className}</h1>
      <StudentListCards students={filteredStudents} />
    </SectionContainer>
  );
};

export default ClassStudentList;
