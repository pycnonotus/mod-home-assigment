import {InvalidProductIdError} from "../../application/errors/InvalidProductIdError";

export class ProductId {
    private constructor(readonly value: string) {
    }

    static create(v: string) {
        //todo commno this
        if (
            !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                v,
            )
        )
            throw new InvalidProductIdError();
        return new ProductId(v);
    }
}
