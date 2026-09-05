import {DomainError} from "../../domain/shared/domain-error";


export class InvalidCustomerError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
