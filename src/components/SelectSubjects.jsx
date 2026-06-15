import Select from "react-select";
const subjectOptions = [
  { value: "Mathematics", label: "Mathematics" },
  { value: "Science", label: "Science" },
  { value: "English", label: "English" },
  { value: "History", label: "History" },
  { value: "Geography", label: "Geography" },
  { value: "Computer Science", label: "Computer Science" },
];

const SelectSubjects = ({ value, onChange }) => {
  return (
    <div className="mb-2">
      <label htmlFor="" className="form-label">
        Select Subject
      </label>
      <Select
        isMulti
        options={subjectOptions}
        value={subjectOptions.filter((option) => value.includes(option.value))}
        onChange={(selectedOptions) =>
          onChange(
            selectedOptions
              ? selectedOptions.map((option) => option.value)
              : [],
          )
        }
        placeholder="Select subjects..."
      />
    </div>
  );
};

export default SelectSubjects;
