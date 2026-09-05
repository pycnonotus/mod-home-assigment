export type {CategoryId, ProductId} from "./ids.ts";
export {toCategoryId, toProductId} from "./ids.ts";

export type {Product} from "./product.ts";

export type {Category} from "./category.ts";
export {hasProduct} from "./category.ts";

export type {Catalog} from "./catalog.ts";
export {
    createCatalog,
    emptyCatalog,
    findCategory,
    findProduct,
    productsInCategory,
} from "./catalog.ts";
