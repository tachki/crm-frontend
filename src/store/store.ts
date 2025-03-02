import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "./slice/isAuthSlice";
import isCarReducer from "./slice/isCarSlice";
export const store = configureStore({
  reducer: {
    isAuth: isAuthReducer,
    isCar: isCarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
