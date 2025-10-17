import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../Slice/productSlice'

const store = configureStore({
    reducer:{
        product:productReducer
    }
})

export default store;