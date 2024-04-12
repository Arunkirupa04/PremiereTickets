// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import seatsReducer from "./Reducers/seatInfoSlice";

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
  },
});
