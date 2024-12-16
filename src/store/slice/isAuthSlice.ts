import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

interface isAuthState {
  isAuth: boolean
}

const initialState: isAuthState = {
  isAuth: false
}

export const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  }
})

export const { setAuth } = isAuthSlice.actions
export default isAuthSlice.reducer