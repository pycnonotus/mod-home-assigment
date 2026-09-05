import { configureStore } from "@reduxjs/toolkit";
import { GroceriesApi } from "../services/groceriesApi";

export const store = configureStore({
    reducer: {
        [GroceriesApi.reducerPath]: GroceriesApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(GroceriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;