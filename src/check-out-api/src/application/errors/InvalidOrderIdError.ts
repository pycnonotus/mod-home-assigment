import {DomainError} from "../../domain/shared/domain-error";

export class InvalidOrderIdError extends DomainError {
    constructor() {
        super("Invalid order id");
    }
}
