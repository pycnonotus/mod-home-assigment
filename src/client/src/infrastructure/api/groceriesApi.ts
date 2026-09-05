import type {Catalog} from "../../domain/catalog";
import {baseApi} from "./baseApi.ts";
import type {CatalogResponseDto} from "./catalogContract.ts";
import {toCatalog} from "./catalogMapper.ts";

export const GroceriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCatalog: builder.query<Catalog, void>({
            query: () => "groceries",
            transformResponse: (response: CatalogResponseDto) => toCatalog(response),
        }),
    }),
});

export const {useGetCatalogQuery} = GroceriesApi;
