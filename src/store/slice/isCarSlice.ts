import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IСhoiceCar } from "@/types/auth.type";

interface isCarState {
  isCar: boolean;
  carData: IСhoiceCar | null;
}

const initialState: isCarState = {
  isCar: false,
  carData: null,
};

export const isCarSlice = createSlice({
  name: "isCar",
  initialState,
  reducers: {
    setCar(state, action: PayloadAction<IСhoiceCar>) {
      state.isCar = true;
      state.carData = action.payload;
    },
  },
});

export const { setCar } = isCarSlice.actions;

export default isCarSlice.reducer;
