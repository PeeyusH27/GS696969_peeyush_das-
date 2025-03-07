import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skus: [],
};

const skusSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    setSkus: (state, action) => {
      state.skus = action.payload;
    },
    addSku: (state, action) => {
      state.skus.push(action.payload);
    },
    updateSku: (state, action) => {
      state.skus = state.skus.map((sku) =>
        sku.id === action.payload.id ? action.payload : sku
      );
    },
    deleteSku: (state, action) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
  },
});

export const { setSkus, addSku, updateSku, deleteSku } = skusSlice.actions;
export default skusSlice.reducer;
