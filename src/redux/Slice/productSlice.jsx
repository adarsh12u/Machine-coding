import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  mode: "grid",
};


const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
      addProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProducts: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    toggleMode: (state, action) => {
      state.mode = action.payload;
    }
  },
 
});
export const { removeProducts ,addProducts ,toggleMode} = productSlice.actions;
export default productSlice.reducer;
