import { IUser } from '@/types/auth.type'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
		clearUser(state) {
      state.user = null;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;