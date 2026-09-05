import {InvalidOrderIdError} from "../../application/errors/InvalidOrderIdError";
import {isValidUuid} from "../shared/validation";

export class OrderId {
    private constructor(readonly value: string) {
    }

    static create(v: string) {
        if (!isValidUuid(v))
            throw new InvalidOrderIdError();
        return new OrderId(v);
    }
}
