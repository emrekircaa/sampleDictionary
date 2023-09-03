import { configureStore } from "@reduxjs/toolkit";
import { wordApi } from "../features/api-slice";

export const store = configureStore({
  reducer: {
    [wordApi.reducerPath]: wordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordApi.middleware),
});
