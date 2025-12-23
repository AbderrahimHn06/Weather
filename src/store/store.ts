import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlice from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    weatherFetch: weatherApiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// To Do : make a hooks.ts file that export custom hooks (typed useDispatch, useSelector)
