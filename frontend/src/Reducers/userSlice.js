// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    phone: "",
    isVerified: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.isVerified = true;
    },
    resetUser: (state) => {
      state.email = "";
      state.phone = "";
      state.isVerified = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
