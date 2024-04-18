import { createSlice } from "@reduxjs/toolkit";

export const theatreSlice = createSlice({
  name: "theatre",
  initialState: {
    theatreId: "",
    name: "",
    location: "",
    ticketPrice: 0,
    showTimes: [],
  },
  reducers: {
    setTheatreDetails: (state, action) => {
      const { theatreId, name, location, ticketPrice, showTimes } =
        action.payload;
      state.theatreId = theatreId;
      state.name = name;
      state.location = location;
      state.ticketPrice = ticketPrice;
      state.showTimes = showTimes;
    },
  },
});

export const { setTheatreDetails } = theatreSlice.actions;
export default theatreSlice.reducer;
