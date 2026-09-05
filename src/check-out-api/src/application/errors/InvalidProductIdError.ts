import {DomainError} from "../../domain/shared/domain-error";

export class InvalidProductIdError extends DomainError {
    constructor() {
        super("Invalid product id");
    }
}
