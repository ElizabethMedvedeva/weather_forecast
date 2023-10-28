import { configureStore } from "@reduxjs/toolkit";

import { daysForecastReducer } from "../reducers/APIreducer";

export const reduxStore = configureStore({
  reducer: { daysForecastReducer },
});

export type StoreType = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;
