import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "schoolStatus",
  initialState: {
    schoolStats: null,
    topStudent: null,
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      state.schoolStats = action.payload;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
});

export default schoolSlice.reducer;
export const { updateSchoolStats, setTopStudent } = schoolSlice.actions;
