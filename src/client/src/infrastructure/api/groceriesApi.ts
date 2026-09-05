import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {GrocerieItem} from "../../types/grocerieItem.ts";


type GroceryCatalog = Record<string, GrocerieItem>;
export const GroceriesApi = createApi({
    reducerPath: "groceries",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    }),
    endpoints: (builder) => ({
        getItems: builder.query<Record<string, GroceryCatalog>, void>({
            query : () => "items",
            transformResponse: (items: GroceryCatalog[]) => Object.fromEntries(

                items.map((i) => [i])

            )
        })
    })
});

