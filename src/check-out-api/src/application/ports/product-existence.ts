import type {ProductId} from '../../domain/order/product-id';

export const PRODUCT_EXISTENCE = Symbol('PRODUCT_EXISTENCE');

export interface ProductExistence {
    findMissing(ids: readonly ProductId[]): Promise<readonly ProductId[]>;
}
