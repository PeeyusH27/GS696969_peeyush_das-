import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "./storeSlice";
import skusReducer from "./skuSlice";

const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
  },
});

export default store;
