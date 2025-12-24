import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ====== Types ======
export type WeatherData = {
  temp: number;
  status: string;
  min: number;
  max: number;
  location: string;
  icon: string;
  loading: boolean;
};

// ====== Consts ======

const initialState: WeatherData = {
  temp: 0,
  status: "waiting",
  min: 0,
  max: 0,
  location: "waiting",
  icon: "",
  loading: true,
};
const coord = { lat: 36.4, lon: 6.6 }; // used on the apiUrl
const API_KEY = "f181a3674143297fdb556914376ca6bb"; // used on the apiUrl

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`;

// ====== Async Thunks ======
export const fetchWeatherData = createAsyncThunk<WeatherData, void>(
  "weather",
  async () => {
    const response = await axios.get(apiUrl);

    const icon = response.data.weather[0].icon;
    const newData: WeatherData = {
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
      min: Math.round(response.data.main.temp_min),
      max: Math.round(response.data.main.temp_max),
      location: response.data.name,
      icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      loading: false,
    };
    return newData;
  }
);

// ====== Slice ======

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      });
  },
});

export default weatherApiSlice.reducer;
