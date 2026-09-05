import type {CategoryId, ProductId} from '../catalog';

export type CartItem = {
    productId: ProductId; productName: string;
    categoryId: CategoryId; categoryName: string; quantity: number;
};

export function isValidQuantity(value: number): boolean {
    return Number.isInteger(value) && value >= 1 && value <= 999;
}
