import {InvalidCustomerError} from '../../application/errors/InvalidCustomerError';
import {Customer} from './customer';

describe('Customer', () => {
    it('normalizes customer details before validating them', () => {
        expect(Customer.create('  Jane Doe  ', '  Jane+orders@Example.COM  '))
            .toEqual({fullName: 'Jane Doe', email: 'jane+orders@example.com'});
    });

    it.each(['', '@', 'jane@', '@example.com', 'jane@example',
        'jane@@example.com', 'jane doe@example.com', 'jane@example .com'])
    ('rejects malformed email %j', email => {
        expect(() => Customer.create('Jane Doe', email)).toThrow(InvalidCustomerError);
    });
});
