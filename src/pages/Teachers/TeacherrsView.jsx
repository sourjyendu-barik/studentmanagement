import React from "react";
import SectionContainer from "../../components/SectionContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchTeacherSync } from "./teacherSlice";
import TeacherList from "../../components/TeacherList";
import Button from "../../components/Button";
const TeacherrsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.teachers);

  useEffect(() => {
    if (teachers.fetchStatus === "idle") {
      dispatch(fetchTeacherSync());
    }
  }, [dispatch, teachers.fetchStatus]);
  //console.log(teachers);

  return (
    <SectionContainer>
      <Button name={"Add teacher"} onClick={() => navigate("/addTeacher")} />
      <h1>Teachers View</h1>
      <TeacherList teacherList={teachers} />
    </SectionContainer>
  );
};
export default TeacherrsView;
