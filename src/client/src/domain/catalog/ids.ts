declare const brand: unique symbol;

type Brand<T, B> = T & { readonly [brand]: B };

export type CategoryId = Brand<string, "CategoryId">;
export type ProductId = Brand<string, "ProductId">;

export function toCategoryId(value: string): CategoryId {
    if (!value || !value.trim()) {
        throw new Error("CategoryId must be a non-empty string");
    }
    return value as CategoryId;
}

export function toProductId(value: string): ProductId {
    if (!value || !value.trim()) {
        throw new Error("ProductId must be a non-empty string");
    }
    return value as ProductId;
}
