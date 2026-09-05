export class ProductsNotFoundError extends Error {
    constructor(readonly productIds: readonly string[]) {
        super(`Products do not exist: ${productIds.join(", ")}`);
    }
}
