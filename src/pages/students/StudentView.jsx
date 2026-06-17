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
  const students = useSelector((state) => state.students);

  useEffect(() => {
    if (students.status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.status]);
  //console.log("students is", students);
  return (
    <>
      <SectionContainer>
        <h1 className="text-center">Student View</h1>
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
        <StudentList studentsList={students} />
      </SectionContainer>
    </>
  );
};

export default StudentView;
