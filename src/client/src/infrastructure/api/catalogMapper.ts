import type {Catalog, Category, Product} from "../../domain/catalog";
import {createCatalog, emptyCatalog, toCategoryId, toProductId} from "../../domain/catalog";
import type {CatalogResponseDto, CategoryDto, ProductDto} from "./catalogContract.ts";

function isUsable(value: string | null | undefined): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

function toProduct(dto: ProductDto): Product | null {
    if (!isUsable(dto?.id) || !isUsable(dto.name)) {
        return null;
    }
    return {id: toProductId(dto.id), name: dto.name};
}

function toCategory(dto: CategoryDto): Category | null {
    if (!isUsable(dto?.id) || !isUsable(dto.name)) {
        return null;
    }
    const products = Array.isArray(dto.products)
        ? dto.products.map(toProduct).filter((product): product is Product => product !== null)
        : [];

    return {id: toCategoryId(dto.id), name: dto.name, products};
}

export function toCatalog(dto: CatalogResponseDto): Catalog {
    if (!Array.isArray(dto)) {
        return emptyCatalog;
    }

    const categories = dto
        .map(toCategory)
        .filter((category): category is Category => category !== null);

    return createCatalog(categories);
}
