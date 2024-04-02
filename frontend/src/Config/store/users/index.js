import { createSlice } from "@reduxjs/toolkit";
import { users } from "./initData";
import { v4 as uuidv4 } from "uuid";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users,
  },
  reducers: {
    addUser: (state, action) => {
      const id = uuidv4();
      state.users.push({
        id,
        ...action.payload,
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
