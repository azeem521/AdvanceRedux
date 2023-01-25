import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui-slice'
import cartSliceReducer from "./cart-slice";

const store=configureStore({
    reducer:{ui:uiReducer,CartSlice:cartSliceReducer}
});

export default store