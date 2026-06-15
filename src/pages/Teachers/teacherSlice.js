import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://student-management-system-kappa-blush.vercel.app/teachers";

// Fetch all teachers
export const fetchTeacherSync = createAsyncThunk(
  "teachers/fetchTeacher",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
);

// Add teacher
export const addTeacherSync = createAsyncThunk(
  "teachers/addTeacher",
  async (teacher) => {
    const response = await axios.post(BASE_URL, teacher);
    return response.data;
  },
);

// Get teacher details
export const teacherDetails = createAsyncThunk(
  "teachers/teacherDetails",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },
);

// Update teacher
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (teacher) => {
    const response = await axios.post(`${BASE_URL}/${teacher._id}`, teacher);
    return response.data;
  },
);
export const deleteteacher = createAsyncThunk(
  "teachers/teacher",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data._id;
  },
);
const teachersSlice = createSlice({
  name: "teachers",

  initialState: {
    teachers: [],
    teacher: null,

    fetchStatus: "idle",
    addStatus: "idle",
    detailsStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH TEACHERS
      .addCase(fetchTeacherSync.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchTeacherSync.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeacherSync.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })

      // ADD TEACHER
      .addCase(addTeacherSync.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addTeacherSync.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.teachers.push(action.payload);
      })
      .addCase(addTeacherSync.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })

      // TEACHER DETAILS
      .addCase(teacherDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(teacherDetails.fulfilled, (state, action) => {
        state.detailsStatus = "success";
        state.teacher = action.payload;
      })
      .addCase(teacherDetails.rejected, (state, action) => {
        state.detailsStatus = "error";
        state.error = action.error.message;
      })

      // UPDATE TEACHER
      .addCase(updateTeacher.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.updateStatus = "success";

        const index = state.teachers.findIndex(
          (teacher) => teacher._id === action.payload._id,
        );

        if (index !== -1) {
          state.teachers[index] = action.payload;
        }

        // state.teacher = action.payload;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      })

      .addCase(deleteteacher.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteteacher.fulfilled, (state, action) => {
        state.deleteStatus = "success";

        state.teachers = state.teachers.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteteacher.rejected, (state, action) => {
        state.deleteStatus = "error";
        state.error = action.error.message;
      });
  },
});

export default teachersSlice.reducer;
