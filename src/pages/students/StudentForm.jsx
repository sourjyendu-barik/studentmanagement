import React, { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import SectionContainer from "../../components/SectionContainer";
import Button from "../../components/Button";
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
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
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
  const validateForm = () => {
    const { name, age, studentClass, grade, attendance, marks, gender } =
      formData;
    if (name.trim().length < 2) {
      return "Name must contain at least 2 characters";
    }
    if (age < 1 || age > 120) {
      return "Age must be between 1 and 120";
    }
    if (studentClass < 1 || studentClass > 12) {
      return "Class must be between 1 and 12";
    }
    if (!grade) {
      return "Please select a grade";
    }

    if (!gender) {
      return "Please select a gender";
    }
    if (exist) {
      if (attendance < 0 || attendance > 100) {
        return "Attendance must be between 0 and 100";
      }
      if (marks < 0 || marks > 100) {
        return "Marks must be between 0 and 100";
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorInFormData = validateForm();
    if (errorInFormData) {
      toast.error(errorInFormData);
      return;
    }
    try {
      console.log("handle submit running");
      //unwrap() throws the rejected thunk error so catch works correctly.
      if (!exist) {
        await dispatch(addStudentAsync(formData)).unwrap();
        clearForm();
      } else {
        await dispatch(updateStudentAsync(formData)).unwrap();
        clearForm();
      }
      toast.success(
        `Students data ${exist ? "updated" : "added"} successfully`,
      );
    } catch (error) {
      //dispatch() ?/?
      console.error(error);
      toast.error(
        `Students data ${exist ? "failed to update" : "failed to add"}`,
      );
    }
  };
  return (
    <SectionContainer>
      <h1 className="text-center">
        {exist ? "Update Student" : "Add Student"}
      </h1>
      <form onSubmit={handleSubmit}>
        <InputBox
          placeholder={"Name"}
          onChange={onChange}
          value={formData.name}
          name="name"
          pattern="[A-Za-z ]+"
          title="Only letters and spaces are allowed"
          minLength={2}
          maxLength={40}
          required
        />
        <InputBox
          placeholder={"Age"}
          onChange={onChange}
          value={formData.age}
          name="age"
          type="number"
          min="1"
          max="120"
          required
        />
        {/* <InputBox
          placeholder={"Class"}
          onChange={onChange}
          value={formData.studentClass}
          type="number"
          name={"studentClass"}
          min="1"
          max="12"
          required
        /> */}
        <div className="mb-2">
          <label htmlFor="class" className="form-label">
            Class :
          </label>
          <select
            name="studentClass"
            value={formData.studentClass}
            onChange={onChange}
            required
            className="form-select"
            id="class"
          >
            <option value="">Select Class</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Class
              </option>
            ))}
          </select>
        </div>

        {/* <InputBox
          placeholder={"Grade"}
          onChange={onChange}
          value={formData.grade}
          name="grade"
          pattern="[A-Za-z+ ]+"
          title="Grade must contain only letters and + sign"
          required
        /> */}
        <div className="mb-2">
          <label htmlFor="grade" className="form-label">
            Grade :
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={onChange}
            required
            className="form-select"
            id="grade"
          >
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
          </select>
        </div>

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
              min="0"
              max="100"
            />
            <InputBox
              placeholder={"Marks"}
              onChange={onChange}
              value={formData.marks}
              name="marks"
              type="number"
              min="0"
              max="100"
            />
          </>
        )}
        <div className="d-flex justify-content-center mt-3">
          <div className="col-12 col-md-5">
            <Button
              name={exist ? "Update Student Details" : "Add New Student"}
              type="submit"
              color={exist ? "success" : "primary"}
              className="w-100"
            />
          </div>
        </div>
      </form>
      {/* <p>
        {formData.name} {formData.age} {formData.grade} {formData.gender}
      </p> */}
    </SectionContainer>
  );
};

export default StudentForm;
