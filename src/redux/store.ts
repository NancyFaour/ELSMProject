// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slices/categorySlice';

import createSagaMiddleware from "redux-saga";
import categorySaga from '@/redux/sagas/categorySaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk:false
    }).concat(sagaMiddleware)
});
sagaMiddleware.run(categorySaga);
export default store;

export const getStateType = () => store.getState();
export type RootState = ReturnType<typeof getStateType>;
export type AppDispatch = typeof store.dispatch;