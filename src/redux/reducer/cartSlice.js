import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const alreadyExist = state.product.find((item) => item.id === action.payload.id)
      if (!alreadyExist) {
        state.product.push(action.payload);
      }
    },
    remove(state, action) {
      const updatedProducts = state.product.filter((item) => item.id != action.payload);
      state.product = updatedProducts;
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;