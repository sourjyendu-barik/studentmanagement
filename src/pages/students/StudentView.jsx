import { useDispatch, useSelector } from "react-redux";
import SectionContainer from "../../components/SectionContainer";
import { useEffect } from "react";
import { fetchStudents } from "./studentsSlice";
import StudentList from "../../components/StudentList";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
const StudentView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  const students = useSelector((state) => state.students);
  //console.log("students is", students);
  return (
    <>
      <SectionContainer>
        <h1>Student View</h1>
        {/* <button
          className="btn btn-warning"
          onClick={() => navigate("/addstudent")}
        >
          Add Student
        </button> */}
        <Button
          color="warning"
          onClick={() => navigate("/addstudent")}
          name={"Add student"}
        />
      </SectionContainer>

      <SectionContainer>
        <h2>Student List</h2>
        <StudentList studentsList={students} />
      </SectionContainer>
    </>
  );
};

export default StudentView;
