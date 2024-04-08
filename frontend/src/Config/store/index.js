import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./users";
import adminReducer from "./admin";
import productReducer from "./products";
import cartReducer from "./cart";
import orderReducer from "./orders";
import oauthReducer from "./oauth"
import oauthAdminReducer from "./oauthAdmin";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  oauth: oauthReducer,
  users: userReducer,
  admin: adminReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  oauthAdmin: oauthAdminReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
