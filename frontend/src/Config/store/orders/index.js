import { createSlice } from "@reduxjs/toolkit";
import { orders } from "./initData";
import { v4 as uuidv4 } from "uuid";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders,
  },
  reducers: {
    addOrder: (state, action) => {
      const id = uuidv4();
      state.orders.push({
        id,
        ...action.payload,
      });
    },
    deleteOrder: (state, action) => {
      state.orders = state.users.filter((order) => order.id !== action.payload);
    },
  },
});

export const { addOrder, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
