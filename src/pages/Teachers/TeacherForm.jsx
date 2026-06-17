import React, { useEffect } from "react";
import InputBox from "../../components/InputBox";
import { useState } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { addTeacherSync, updateTeacher } from "./teacherSlice";
import SelectSubjects from "../../components/SelectSubjects";
import { toast } from "react-toastify";
const TeacherForm = ({ exist = false, teacherData = {} }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    attendance: "",
    experience: "",
    subjects: [],
  });
  useEffect(() => {
    if (exist && teacherData) {
      //  console.log("useEffect running ", "teacherData is", teacherData, exist);
      setFormData((prev) => ({
        ...prev,
        ...teacherData,
      }));
    }
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const clearForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      attendance: "",
      experience: "",
      subjects: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!exist) {
        // console.log("creating new teacher");
        await dispatch(addTeacherSync(formData));
        clearForm();
      } else {
        await dispatch(updateTeacher(formData));
        clearForm();
      }
      toast.success(
        `Teachers data ${exist ? "Updated" : "Added"} successfully.`,
      );
    } catch (error) {
      console.error(error);
      toast.error(`Teachers data failed to ${exist ? "Update" : "Add"}`);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputBox
          placeholder={"Teacher's Name"}
          onChange={onChange}
          value={formData.name}
          name="name"
          pattern="[A-Za-z ]+"
          title="Only letters and spaces are allowed"
        />
        <InputBox
          placeholder={"Teacher's Age"}
          onChange={onChange}
          value={formData.age}
          name="age"
          type="number"
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
            />
            Female
          </label>
        </div>

        <InputBox
          placeholder={"Attendance"}
          onChange={onChange}
          value={formData.attendance}
          name="attendance"
          type="number"
        />
        <InputBox
          placeholder={"Experience"}
          onChange={onChange}
          value={formData.experience}
          name="experience"
          type="number"
        />
        <SelectSubjects
          value={formData.subjects}
          onChange={(subjects) =>
            setFormData({
              ...formData,
              subjects,
            })
          }
        />
        <div className="d-flex justify-content-center mt-3">
          <div className="col-12 col-md-5">
            <Button
              name={exist ? "Update Teacher Details" : "Add New Teacher"}
              type="submit"
              color={exist ? "secondary" : "primary"}
              className="w-100"
            />
          </div>
        </div>
      </form>
      {/* <p>
        {formData.name} {formData.age} {formData.attendance} {formData.gender}{" "}
        {formData.experience}
      </p> */}
    </div>
  );
};

export default TeacherForm;
