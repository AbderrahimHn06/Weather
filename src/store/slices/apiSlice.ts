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
    setWeatherData(state, action: PayloadAction<WeatherData>) {
      state.temp = action.payload.temp;
      state.status = action.payload.status;
      state.min = action.payload.min;
      state.max = action.payload.max;
      state.location = action.payload.location;
      state.icon = action.payload.icon;
    },
  },
});

export default weatherApiSlice.reducer;
export const { setWeatherData } = weatherApiSlice.actions;
