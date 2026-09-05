import {useCallback, useMemo} from "react";
import type {Category, CategoryId, Product, ProductId} from "../../domain/catalog";
import {emptyCatalog, productsInCategory} from "../../domain/catalog";
import {GroceriesApi} from "../../infrastructure/api/groceriesApi.ts";
import {useAppDispatch, useAppSelector} from "../../stores/hooks.ts";
import {categorySelected, productSelected} from "./catalogSelectionSlice.ts";
import {selectSelectedCategoryId, selectSelectedProductId} from "./catalogSelectors.ts";

export type GroceriesCatalogViewModel = {
    categories: readonly Category[];
    products: readonly Product[];
    selectedCategoryId: CategoryId | null;
    selectedProductId: ProductId | null;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
    selectCategory: (id: CategoryId | null) => void;
    selectProduct: (id: ProductId | null) => void;
};

export function useGroceriesCatalog(): GroceriesCatalogViewModel {
    const dispatch = useAppDispatch();
    const {data: catalog = emptyCatalog, isLoading, isError, refetch} = GroceriesApi.useGetCatalogQuery();

    const selectedCategoryId = useAppSelector(selectSelectedCategoryId);
    const selectedProductId = useAppSelector(selectSelectedProductId);

    const products = useMemo(
        () => productsInCategory(catalog, selectedCategoryId),
        [catalog, selectedCategoryId],
    );

    const selectCategory = useCallback(
        (id: CategoryId | null) => {
            dispatch(categorySelected(id));
        },
        [dispatch],
    );

    const selectProduct = useCallback(
        (id: ProductId | null) => {
            dispatch(productSelected(id));
        },
        [dispatch],
    );

    return {
        categories: catalog.categories,
        products,
        selectedCategoryId,
        selectedProductId,
        isLoading,
        isError,
        refetch: () => {
            void refetch();
        },
        selectCategory,
        selectProduct,
    };
}
