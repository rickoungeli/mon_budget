import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from '../features/categoriesReducer';
import operationsSlice from "../features/operationsReducer";
import homeSlice from "../features/homeReducer";

export default configureStore({
    reducer:{
        categories: categoriesSlice,
        operations: operationsSlice,
        home:homeSlice,
        
    },
})