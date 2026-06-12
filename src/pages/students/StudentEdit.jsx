import React from "react";
import StudentForm from "./StudentForm";
import { useLocation } from "react-router";
const StudentEdit = () => {
  const location = useLocation();
  const exist = location.state?.exist || false;
  const studentsData = location.state?.studentsData || {};
  return <StudentForm exist={exist} studentsData={studentsData} />;
};

export default StudentEdit;
