import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // uses local storage by default
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

import seatsReducer from "./Reducers/seatInfoSlice";
import theatreReducer from "./Reducers/theatreSlice";
import showReducer from "./Reducers/showSlice";
import movieReducer from "./Reducers/movieSlice";
import userReducer from "./Reducers/userSlice";

const rootReducer = combineReducers({
  seats: seatsReducer,
  theatre: theatreReducer,
  movie: movieReducer,
  show: showReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root", // The key for the persisted storage
  storage, // The storage engine, typically local storage in web
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // Create a persistor object
