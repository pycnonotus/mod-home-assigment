import { configureStore } from "@reduxjs/toolkit";
import { catalogSelectionSlice } from "../application/catalog/catalogSelectionSlice.ts";
import { GroceriesApi } from "../infrastructure/api/groceriesApi.ts";

export const store = configureStore({
    reducer: {
        [GroceriesApi.reducerPath]: GroceriesApi.reducer,
        [catalogSelectionSlice.reducerPath]: catalogSelectionSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(GroceriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
