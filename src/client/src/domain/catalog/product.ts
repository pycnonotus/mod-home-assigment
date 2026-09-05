import type {ProductId} from "./ids.ts";

export type Product = {
    readonly id: ProductId;
    readonly name: string;
};
