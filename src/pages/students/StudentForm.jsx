import React, { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import SectionContainer from "../../components/SectionContainer";
import Button from "../../components/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "./studentsSlice";
import { toast } from "react-toastify";
const StudentForm = ({ exist = false, studentsData = {} }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    marks: "",
    attendance: "",
    grade: "",
    studentClass: "",
  });
  useEffect(() => {
    if (exist && studentsData) {
      setFormData((prev) => ({
        ...prev,
        ...studentsData,
      }));
    }
  }, [exist, studentsData]);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const clearForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      marks: "",
      attendance: "",
      grade: "",
      studentClass: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("handle submit running");
      //unwrap() throws the rejected thunk error so catch works correctly.
      if (!exist) {
        dispatch(addStudentAsync(formData));
        clearForm();
      } else {
        await dispatch(updateStudentAsync(formData)).unwrap();
        clearForm();
      }
      toast.success(`student data ${exist ? "Updted" : "Added"} successfully.`);
    } catch (error) {
      //dispatch() ?/?
      console.error(error);
      toast.error(`student data failed to ${exist ? "update" : "add"}`);
    }
  };
  return (
    <SectionContainer>
      <h1>{exist ? "Update Student" : "Add Student"}</h1>
      <form onSubmit={handleSubmit}>
        <InputBox
          placeholder={"Name"}
          onChange={onChange}
          value={formData.name}
          name="name"
        />
        <InputBox
          placeholder={"Age"}
          onChange={onChange}
          value={formData.age}
          name="age"
          type="number"
        />
        <InputBox
          placeholder={"Class"}
          onChange={onChange}
          value={formData.studentClass}
          type="number"
          name={"studentClass"}
        />
        <InputBox
          placeholder={"Grade"}
          onChange={onChange}
          value={formData.grade}
          name="grade"
        />
        <div className="mb-2">
          <label className="me-2" htmlFor="gender">
            Gender :{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={onChange}
              id="male"
              required
            />
            Male
          </label>
          <label className="ms-3">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={onChange}
              id="female"
              required
            />
            Female
          </label>
        </div>
        {exist && (
          <>
            <InputBox
              placeholder={"Attendance"}
              onChange={onChange}
              value={formData.attendance}
              name="attendance"
              type="number"
            />
            <InputBox
              placeholder={"Marks"}
              onChange={onChange}
              value={formData.marks}
              name="marks"
              type="number"
            />
          </>
        )}
        <Button
          name={exist ? "Update" : "Add"}
          type="submit"
          color={exist ? "secondary" : "primary"}
        />
      </form>
      {/* <p>
        {formData.name} {formData.age} {formData.grade} {formData.gender}
      </p> */}
    </SectionContainer>
  );
};

export default StudentForm;
