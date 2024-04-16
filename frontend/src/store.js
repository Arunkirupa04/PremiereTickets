// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import seatsReducer from "./Reducers/seatInfoSlice";
import theatreReducer from "./Reducers/theatreSlice";
import showReducer from "./Reducers/showSlice";
import movieReducer from "./Reducers/movieSlice";

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
    theatre: theatreReducer,
    movie: movieReducer,
    show: showReducer,
  },
});
