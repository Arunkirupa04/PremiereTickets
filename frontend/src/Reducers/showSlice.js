import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "show",
  initialState: {
    date: "",
    time: "",
    movieId: "",
  },
  reducers: {
    setShowDetails: (state, action) => {
      const { date, time, movieId } = action.payload;
      state.date = date;
      state.time = time;
      state.movieId = movieId;
    },
  },
});

export const { setShowDetails } = showSlice.actions;
export default showSlice.reducer;
