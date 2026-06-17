import React from "react";
import TeacherForm from "./TeacherForm";
import SectionContainer from "../../components/SectionContainer";
import { useLocation } from "react-router";
const UpdateTeacher = () => {
  const location = useLocation();
  const teacherData = location.state?.teacherDetail || {};
  //console.log(teacherData);
  return (
    <SectionContainer>
      <h1 className="text-center">Upadte Teacher Details</h1>
      <TeacherForm exist={true} teacherData={teacherData} />
    </SectionContainer>
  );
};

export default UpdateTeacher;
