import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {CategoryId, ProductId} from "../../domain/catalog";

export type CatalogSelectionState = {
    categoryId: CategoryId | null;
    productId: ProductId | null;
};

const initialState: CatalogSelectionState = {
    categoryId: null,
    productId: null,
};

export const catalogSelectionSlice = createSlice({
    name: "catalogSelection",
    initialState,
    reducers: {
        categorySelected(state, action: PayloadAction<CategoryId | null>) {
            state.categoryId = action.payload;
            state.productId = null;
        },
        productSelected(state, action: PayloadAction<ProductId | null>) {
            state.productId = action.payload;
        },
        selectionCleared(state) {
            state.categoryId = null;
            state.productId = null;
        },
    },
});

export const {categorySelected, productSelected, selectionCleared} = catalogSelectionSlice.actions;
