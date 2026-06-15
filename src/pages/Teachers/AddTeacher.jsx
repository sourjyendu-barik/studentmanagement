import React from "react";
import SectionContainer from "../../components/SectionContainer";
import TeacherForm from "./TeacherForm";

const AddTeacher = () => {
  return (
    <SectionContainer>
      <h1>Add New Teacher</h1>
      <TeacherForm exist={false} />
    </SectionContainer>
  );
};

export default AddTeacher;
