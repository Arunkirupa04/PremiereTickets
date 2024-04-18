import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "show",
  initialState: {
    date: "",
    time: "",
    movieId: "",
    showId: "",
  },
  reducers: {
    setShowDetails: (state, action) => {
      const { date, time, movieId, showId } = action.payload;
      state.date = date;
      state.showId = showId;
      state.time = time;
      state.movieId = movieId;
    },
  },
});

export const { setShowDetails } = showSlice.actions;
export default showSlice.reducer;
