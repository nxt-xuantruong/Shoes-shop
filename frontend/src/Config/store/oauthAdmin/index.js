import { createSlice } from "@reduxjs/toolkit";

export const oauthAdminSlice = createSlice({
  name: "oauthAdmin",
  initialState: {
    isAuthenAdmin: false,
    name: "",
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.isAuthenAdmin = false;
      state.name = "";
    },
    loginAdmin: (state, action) => {
      const { name} = action.payload;
        state.name = name;
    },
  },
});

export const { updateOauthInfo, loginAdmin, logoutAdmin } =
  oauthAdminSlice.actions;

export default oauthAdminSlice.reducer;