import { createSlice } from "@reduxjs/toolkit";
import { cart } from "./initData";
import { v4 as uuidv4 } from "uuid";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart,
  },
  reducers: {
    addCart: (state, action) => {
      const id = uuidv4();
      state.cart.push({
        id,
        ...action.payload,
      });
    },
    deleteCart: (state, action) => {
      state.cart = state.cart.filter(
        (c) =>
          !(c.id === action.payload.id && c.selectedSize === action.payload.size)
      );
    },
    deleteAllCart: (state, action) => {
       state.cart = state.cart.filter((c) => c.userId !== action.payload.idUser);
    },
    editCart: (state, action) => {
      state.cart = state.cart.map((c) =>
        c.id === action.payload.id? action.payload : c
      );
    },
  },
});

export const { addCart, deleteCart, editCart, deleteAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
