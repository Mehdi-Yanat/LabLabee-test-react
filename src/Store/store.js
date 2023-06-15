import { configureStore } from "@reduxjs/toolkit";
import labsReducer from "./labs/labsSlice";


export default configureStore({
    reducer: {
        labs: labsReducer,
    },
})