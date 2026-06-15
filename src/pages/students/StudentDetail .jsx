import React from "react";
import { useParams, useNavigate } from "react-router";
import SectionContainer from "../../components/SectionContainer";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { deleteStudentAsync } from "./studentsSlice";
import { toast } from "react-toastify";
const StudentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(id);
  const studentDetail = useSelector((state) =>
    state.students.students.find((s) => s._id === id),
  );
  // console.log(studentDetail);
  if (!studentDetail) {
    return <p className="container">Student not found</p>;
  }

  const { age, attendance, gender, grade, marks, name, _id, studentClass } =
    studentDetail;
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStudentAsync(id));
      toast.success("Deleted student data successfully");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };
  return (
    <SectionContainer>
      <h1>Student Details</h1>
      <p>Name : {name}</p>
      <p>Age : {age}</p>
      <p>Grade : {grade}</p>
      <p>Gender : {gender}</p>
      <p>Class : {studentClass ? studentClass : "Data not available"}</p>
      <p>Attendance : {attendance ? attendance : "Data not available"}</p>
      <p>Marks : {marks ? marks : "Data not available"}</p>
      <div className="d-flex gap-2">
        <Button
          name="Edit details"
          color="warning"
          onClick={() =>
            navigate(`/studentEdit/:${_id}`, {
              state: {
                exist: true,
                studentsData: studentDetail,
              },
            })
          }
        />
        <Button
          name="Delete"
          color="danger"
          onClick={() => handleDelete(_id)}
        />
      </div>
    </SectionContainer>
  );
};

export default StudentDetail;
