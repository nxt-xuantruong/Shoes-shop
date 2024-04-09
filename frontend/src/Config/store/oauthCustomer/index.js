import { createSlice } from "@reduxjs/toolkit";

export const oauthCustomerSlice = createSlice({
  name: "oauthCustomer",
  initialState: {
      id:"",
      user: "",
      email: "",
  },
  reducers: {
    logoutCustomer: (state) => {
      state.user = "";
      state.email = "";
      state.id = "";
    },
    loginCustomer: (state, action) => {
      const { email, password } = action.payload.data;
      const checkUser= action.payload.users.find((user)=> user.email === email && user.password === password);
      if(checkUser) {
        state.user = checkUser.name;
        state.email = checkUser.email;
        state.id = checkUser.id;
      }
    },
  },
});

export const { loginCustomer, logoutCustomer } =
oauthCustomerSlice.actions;

export default oauthCustomerSlice.reducer;