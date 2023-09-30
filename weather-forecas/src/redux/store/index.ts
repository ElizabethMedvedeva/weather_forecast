import { configureStore } from "@reduxjs/toolkit"
import { APISlice } from "../reducers/APIreducer"

export const store = configureStore({
    reducer: APISlice.reducer
})