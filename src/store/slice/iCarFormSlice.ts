import { create } from "zustand";
import axios from "axios";
import { IFormCar } from "@/types/car.type";

interface CarForm {
  initialState: null;
  senData: (data: IFormCar) => Promise<void>;
}

export const useCarForm = create<CarForm>((set, get) => ({
  initialState: null,
  senData: async (data: any) => {
    try {
      const response = await axios.post(
        "https://6765561852b2a7619f5f3883.mockapi.io/test/form",
        data
      );
      set(() => ({
        initialState: response.data,
      }));
    } catch (error) {
      console.error("Ошибка", error);
    }
  },
}));
