import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import SectionContainer from "../../components/SectionContainer";
import Button from "../../components/Button";
import { teacherDetails } from "./teacherSlice";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteteacher } from "./teacherSlice";
import { toast } from "react-toastify";
const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const details = useSelector((state) => state.teachers.teachers).find(
    (t) => t._id === id,
  );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(teacherDetails(id));
  // }, []);
  // const { teacher, detailsStatus, error } = useSelector(
  //   (state) => state.teachers,
  // );
  // if (detailsStatus === "loading") {
  //   return <Loading message={"Teachers data is loading......."} />;
  // }
  // if (detailsStatus === "error") {
  //   return <ErrorMessage message={error} />;
  // }
  // //console.log(teacher);
  // const details = teacher;
  if (!details) {
    return <p className="container">teachers data not found!</p>;
  }
  const handleDelete = async (id) => {
    try {
      dispatch(deleteteacher(id));
      toast.success("Deleted teacher data successfully");
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };
  return (
    <SectionContainer>
      <h1 className="text-center">Teacher Details</h1>{" "}
      <div
        className="card mx-auto mb-3"
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
        }}
      >
        <div className="card-body">
          <h3>{details?.name}</h3>
          <p>Age : {details?.age}</p>
          <p>Gender : {details?.gender}</p>
          <p>Attendance : {details?.attendance}%</p>
          <p>Experience :{details?.experience}</p>
          <p>Subjects: {details?.subjects?.join(", ")}</p>
          <div className="d-flex gap-3">
            <Button
              name={"Update Details"}
              onClick={() => {
                navigate("/updateTeacher", {
                  state: {
                    teacherDetail: details,
                  },
                });
              }}
            />
            <Button
              name={"Delete"}
              color="danger"
              onClick={() => {
                handleDelete(details?._id);
              }}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default TeacherDetails;
