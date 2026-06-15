import React, { useEffect } from "react";
import SectionContainer from "../../components/SectionContainer";
import { useSelector, useDispatch } from "react-redux";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import RefetechStudents from "../../components/RefetechStudents";

const SchoolView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  const { schoolStats } = useSelector((state) => state.school);
  const {
    teachers,
    fetchStatus,
    error: teacherError,
  } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (students.length === 0) return;

    const totalStudents = students.length;

    const averageAttendance = (
      students.reduce((accu, curr) => accu + curr.attendance, 0) / totalStudents
    ).toFixed(2);

    const averageMarks = (
      students.reduce((accu, curr) => accu + curr.marks, 0) / totalStudents
    ).toFixed(2);

    const topStudentInfo = students.reduce((accu, curr) =>
      accu.marks > curr.marks ? accu : curr,
    );
    const totalBoys = students.filter(
      (student) => student.gender === "Male",
    ).length;

    const totalGirls = students.filter(
      (student) => student.gender === "Female",
    ).length;

    const totalStudent_80 = students.filter(
      (student) => student.marks >= 80,
    ).length;
    const topStudent = topStudentInfo.name;

    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent,
        totalBoys,
        totalGirls,
        totalStudent_80,
      }),
    );

    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);

  if (status === "loading") {
    return <Loading message="Students data is loading......." />;
  }

  if (status === "error") {
    return <ErrorMessage message={error} />;
  }

  if (students.length === 0) {
    return (
      <div className="container">
        <p>No students available</p>
        <RefetechStudents />
      </div>
    );
  }
  // console.log(teachers);
  return (
    <SectionContainer>
      <h1>School View</h1>
      <p>Total Students: {schoolStats?.totalStudents}</p>
      <p>Boys : {schoolStats?.totalBoys}</p>
      <p>Girls : {schoolStats?.totalGirls}</p>
      <p>Average Marks: {schoolStats?.averageMarks}</p>
      <p>Average Attendance: {schoolStats?.averageAttendance}</p>
      <p>Topper Student: {schoolStats?.topStudent}</p>
      <p>Top Students(80% +) : {schoolStats?.totalStudent_80}</p>
    </SectionContainer>
  );
};

export default SchoolView;
