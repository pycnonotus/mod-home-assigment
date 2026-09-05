import {InvalidProductIdError} from "../../application/errors/InvalidProductIdError";
import {isValidUuid} from "../shared/validation";

export class ProductId {
    private constructor(readonly value: string) {
    }

    static create(v: string) {
        if (!isValidUuid(v))
            throw new InvalidProductIdError();
        return new ProductId(v);
    }
}
