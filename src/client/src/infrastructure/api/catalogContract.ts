export type ProductDto = {
    id?: string | null;
    name?: string | null;
};

export type CategoryDto = {
    id?: string | null;
    name?: string | null;
    products?: ProductDto[] | null;
};

export type CatalogResponseDto = CategoryDto[];
