import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setStores: (state : any, action : any) => {
      state.stores = action.payload;
    },
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    updateStore: (state, action) => {
      state.stores = state.stores.map((store) =>
        store.id === action.payload.id ? action.payload : store
      );
    },
    deleteStore: (state, action) => {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
  },
});

export const { setStores, addStore, updateStore, deleteStore } = storesSlice.actions;
export default storesSlice.reducer;
