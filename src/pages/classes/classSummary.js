import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchClassSummary = createAsyncThunk(
  "/classSummary/fetchClassSummary",
  async () => {
    const res = await axios.get(
      "https://student-management-system-kappa-blush.vercel.app/classSummary",
    );
    return res.data;
  },
);
const classSummary = createSlice({
  name: "classSummary",
  initialState: {
    classSummary: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassSummary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClassSummary.fulfilled, (state, action) => {
        state.status = "success";
        state.classSummary = action.payload.data;
      })
      .addCase(fetchClassSummary.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
export default classSummary.reducer;
