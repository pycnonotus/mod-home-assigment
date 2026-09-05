import {InvalidCustomerError} from "../../application/errors/InvalidCustomerError";

export class Customer {
    private constructor(
        readonly fullName: string,
        readonly email: string,
    ) {
    }

    static create(name: string, email: string) {
        name = name.trim();
        email = email.trim().toLowerCase();

        // if !first-name !last-name
        if (name.length < 2)
            throw new InvalidCustomerError("Invalid customer name");

        if (!email.includes("@"))//todo change to regex check , maybe common lib?
            throw new InvalidCustomerError("Invalid customer email");

        return new Customer(name, email);
    }
}
