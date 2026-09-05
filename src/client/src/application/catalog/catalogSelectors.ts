import type {CategoryId, ProductId} from "../../domain/catalog";
import type {RootState} from "../../stores/groceriesStore.ts";
import type {CatalogSelectionState} from "./catalogSelectionSlice.ts";
import {catalogSelectionSlice} from "./catalogSelectionSlice.ts";

export function selectCatalogSelection(state: RootState): CatalogSelectionState {
    return state[catalogSelectionSlice.reducerPath];
}

export function selectSelectedCategoryId(state: RootState): CategoryId | null {
    return selectCatalogSelection(state).categoryId;
}

export function selectSelectedProductId(state: RootState): ProductId | null {
    return selectCatalogSelection(state).productId;
}
