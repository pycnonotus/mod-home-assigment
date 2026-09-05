import {InvalidQuantityError} from "../../application/errors/InvalidQuantityError";

export class Quantity {
    private constructor(readonly value: number) {
    }

    static create(v: number) {
        if (!Number.isInteger(v) || v < 1 || v > 999)
            throw new InvalidQuantityError();
        return new Quantity(v);
    }
}
