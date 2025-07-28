// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export const getStateType = () => store.getState();
export type RootState = ReturnType<typeof getStateType>;
export type AppDispatch = typeof store.dispatch;