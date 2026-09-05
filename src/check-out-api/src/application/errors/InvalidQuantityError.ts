import {DomainError} from "../../domain/shared/domain-error";


export class InvalidQuantityError extends DomainError {
    constructor() {
        super("Quantity must be an integer between 1 and 999");
    }
}
