import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//actions
//action for fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://student-management-system-kappa-blush.vercel.app/students",
    );
    //console.log("response is", response);
    return response.data;
  },
);

//action for add student
export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (student) => {
    const response = await axios.post(
      "https://student-management-system-kappa-blush.vercel.app/students",
      student,
    );
    return response.data;
  },
);
//action for deleting a student
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    const response = await axios.delete(
      `https://student-management-system-kappa-blush.vercel.app/students/${id}`,
    );
    return response.data;
  },
);

//action for update student
export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async (student) => {
    const response = await axios.post(
      `https://student-management-system-kappa-blush.vercel.app/students/${student._id}`,
      student,
    );
    console.log(response.data);
    return response.data;
  },
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    addStatus: "idle",
    updateStatus: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
    studentClassFilter: "All",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setClass: (state, action) => {
      state.studentClassFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builders for fetching data
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //builder for adding data
    builder
      .addCase(addStudentAsync.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.students.push(action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      });
    //builder for updating state
    builder
      .addCase(updateStudentAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.updateStatus = "success";

        const index = state.students.findIndex(
          (student) => student._id === action.payload._id,
        );

        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
    //builder for deleting student data
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload._id,
      );
    });
  },
});
export default studentsSlice.reducer; //this is for importing in store
export const { setFilter, setSortBy, setClass } = studentsSlice.actions; //this is for dispatching
