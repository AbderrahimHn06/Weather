import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ====== Types ======
type WeatherData = {
  temp: number;
  status: string;
  min: number;
  max: number;
  location: string;
  icon: string;
};

// ====== Consts ======

const initialState: WeatherData = {
  temp: 0,
  status: "waiting",
  min: 0,
  max: 0,
  location: "waiting",
  icon: "",
};

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: initialState,
  reducers: {
    firstAction(state, action: PayloadAction<number>) {
      state.temp = action.payload;
    },
  },
});

export default weatherApiSlice.reducer;
export const { firstAction } = weatherApiSlice.actions;
