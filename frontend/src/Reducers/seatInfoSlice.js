// src/store/seatsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const seatsSlice = createSlice({
  name: "seats",
  initialState: {
    selectedSeats: [],
    count: 0,
  },
  reducers: {
    selectSeat: (state, action) => {
      // Add or remove seat based on whether it's already selected
      const { row, col } = action.payload;
      const index = state.selectedSeats.findIndex(
        (seat) => seat.row === row && seat.col === col
      );
      if (index >= 0) {
        state.selectedSeats.splice(index, 1); // Remove seat if already selected
      } else {
        state.selectedSeats.push({ row, col }); // Add seat if not selected
      }
      const { count } = action.payload;

      state.count = count;
    },
    resetSeats: (state) => {
      state.selectedSeats = [];
    },
  },
});

export const { selectSeat, resetSeats } = seatsSlice.actions;

export default seatsSlice.reducer;
