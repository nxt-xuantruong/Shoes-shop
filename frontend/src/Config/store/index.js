import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import userReducer from "./users";
import productReducer from "./products";
import cartReducer from "./cart";
import oauthReducer from "./oauth"
import oauthAdminReducer from "./oauthAdmin";
import oauthCustomerReducer from "./oauthCustomer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  oauth: oauthReducer,
  products: productReducer,
  cart: cartReducer,
  oauthAdmin: oauthAdminReducer,
  oauthCustomer: oauthCustomerReducer,
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
