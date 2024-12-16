import { configureStore } from '@reduxjs/toolkit'
import isAuthReducer from './slice/isAuthSlice'

export const store = configureStore({
  reducer: {
    isAuth: isAuthReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store