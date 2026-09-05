import type {Category} from "./category.ts";
import type {CategoryId, ProductId} from "./ids.ts";
import type {Product} from "./product.ts";

export type Catalog = {
    readonly categories: readonly Category[];
};

export const emptyCatalog: Catalog = {categories: []};

function byName<T extends { readonly name: string }>(a: T, b: T): number {
    return a.name.localeCompare(b.name);
}
export function createCatalog(categories: readonly Category[]): Catalog {
    const seen = new Set<CategoryId>();
    const unique: Category[] = [];

    for (const category of categories) {
        if (seen.has(category.id)) {
            continue;
        }
        seen.add(category.id);
        unique.push({
            ...category,
            products: [...category.products].sort(byName),
        });
    }

    return {categories: unique.sort(byName)};
}

export function findCategory(catalog: Catalog, id: CategoryId | null): Category | null {
    if (!id) {
        return null;
    }
    return catalog.categories.find((category) => category.id === id) ?? null;
}

export function productsInCategory(catalog: Catalog, id: CategoryId | null): readonly Product[] {
    return findCategory(catalog, id)?.products ?? [];
}

export function findProduct(catalog: Catalog, id: ProductId | null): Product | null {
    if (!id) {
        return null;
    }
    for (const category of catalog.categories) {
        const product = category.products.find((candidate) => candidate.id === id);
        if (product) {
            return product;
        }
    }
    return null;
}
