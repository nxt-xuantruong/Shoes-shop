import { createSlice } from "@reduxjs/toolkit";
import { products } from "./initData";
import { v4 as uuidv4 } from "uuid";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products,
  },
  reducers: {
    addProduct: (state, action) => {
      const id = uuidv4();
      state.products.push({
        id,
        ...action.payload,
      });
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    editProduct: (state, action) => {
      state.products = state.products.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
  },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;
