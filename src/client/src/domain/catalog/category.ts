import type {CategoryId, ProductId} from "./ids.ts";
import type {Product} from "./product.ts";

export type Category = {
    readonly id: CategoryId;
    readonly name: string;
    readonly products: readonly Product[];
};

export function hasProduct(category: Category, productId: ProductId | null): boolean {
    if (!productId) {
        return false;
    }
    return category.products.some((product) => product.id === productId);
}
