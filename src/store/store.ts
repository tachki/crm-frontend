import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "./slice/isAuthSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    isAuth: isAuthReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
