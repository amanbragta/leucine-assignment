import { configureStore } from "@reduxjs/toolkit";
import supabaseReducer from "./supbaseSlice.js";

const store = configureStore({
  reducer: {
    supabase: supabaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
