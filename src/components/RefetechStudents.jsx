import React from "react";
import Button from "./Button";
import { fetchStudents } from "../pages/students/studentsSlice";
import { useDispatch } from "react-redux";
const RefetechStudents = () => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(fetchStudents());
  };
  return <Button onClick={handleOnClick} name={"Refresh Student Data"} />;
};

export default RefetechStudents;
