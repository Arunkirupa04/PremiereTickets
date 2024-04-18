import { createSlice } from "@reduxjs/toolkit";

export const seatsSlice = createSlice({
  name: "seats",
  initialState: {
    selectedSeats: [],
    count: 0,
  },
  reducers: {
    selectSeat: (state, action) => {
      const { row, col } = action.payload;
      const { seats } = action.payload;
      const index = state.selectedSeats.findIndex(
        (seat) => seat.row === row && seat.col === col
      );

      state.selectedSeats = seats;
      const { count } = action.payload;
      // Automatically update count
      state.count = count;

      console.log("Updated state after:", state.selectedSeats);
    },
    resetSeats: (state) => {
      state.selectedSeats = [];
      state.count = 0;
    },
  },
});

export const { selectSeat, resetSeats } = seatsSlice.actions;

export default seatsSlice.reducer;
