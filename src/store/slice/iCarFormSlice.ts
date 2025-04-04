import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarFormState {
  place: string;
  dataRes: string;
  timeRes: string;
  dataRet: string;
  timeRet: string;
}

const initialState: CarFormState = {
  place: '',
  dataRes: '',
  timeRes: '',
  dataRet: '',
  timeRet: '',
};

export const carFormSlice = createSlice({
  name: 'carForm',
  initialState,
  reducers: {
    senData: (state, action: PayloadAction<Partial<CarFormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { senData } = carFormSlice.actions;

export default carFormSlice.reducer;
export const useCarForm = () => {
    return {
      senData: (data: any) => ({ type: 'carForm/senData', payload: data }),
    };
  };