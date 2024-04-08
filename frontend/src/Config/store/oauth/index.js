import { createSlice } from "@reduxjs/toolkit";
import oauthInfo from "./initData";

export const oauthSlice = createSlice({
  name: "oauth",
  initialState: {
    oauthInfo,
  },
  reducers: {
    updateOauthInfo: (state, action) => {
      state.oauthInfo = action.payload;
    },
    logOut: (state, action) => {
      state.oauthInfo = oauthInfo;
    },
  },
});

export const { updateOauthInfo, logOut } = oauthSlice.actions;
export default oauthSlice.reducer;