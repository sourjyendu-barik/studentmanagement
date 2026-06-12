import React, { useEffect } from "react";
import SectionContainer from "../../components/SectionContainer";
import { useSelector, useDispatch } from "react-redux";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";
const SchoolView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  if (status === "loading") {
    return <Loading message={"Students data is loading......."} />;
  }
  if (status === "error") {
    return <ErrorMessage message={error} />;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const totalStudents = students.length;

    const averageAttendance = (
      students.reduce((accu, curr) => curr.attendance + accu, 0) / totalStudents
    ).toFixed(2);

    const averageMarks = (
      students.reduce((accu, curr) => accu + curr.marks, 0) / totalStudents
    ).toFixed(2);
    const topStudentInfo = students.reduce((accu, curr) =>
      accu.marks > curr.marks ? accu : curr,
    );
    const topStudent = topStudentInfo.name;
    //console.log(topStudent, totalStudents, averageAttendance, averageMarks);
    dispatch(
      updateSchoolStats({
        topStudent,
        totalStudents,
        averageAttendance,
        averageMarks,
      }),
    );
    dispatch(setTopStudent(topStudent));
  }, []);
  const { schoolStats } = useSelector((state) => state.school);
  // console.log(state);
  return (
    <SectionContainer>
      <h1>School view</h1>
      <p>Total Students : {schoolStats?.totalStudents}</p>
      <p>Average Marks : {schoolStats?.averageMarks}</p>
      <p>Average Attendance : {schoolStats?.averageAttendance}</p>
      <p>Top Student : {schoolStats?.topStudent}</p>
    </SectionContainer>
  );
};

export default SchoolView;
