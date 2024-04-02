import { createSlice } from "@reduxjs/toolkit";
import { admins } from "./initData";
import { v4 as uuidv4 } from "uuid";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins,
  },
  reducers: {
    addAdmin: (state, action) => {
      const id = uuidv4();
      state.admins.push({
        id,
        ...action.payload,
      });
    },
    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter(
        (admin) => admin.id !== action.payload
      );
    },
  },
});

export const { addAdmin, deleteAdmin } = adminSlice.actions;

export default adminSlice.reducer;
