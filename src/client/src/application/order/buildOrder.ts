import {type CartItem, isValidQuantity} from '../../domain/order/cart.ts';
import {isValidEmail} from '../../domain/shared/validation.ts';

export type CustomerDetails = { firstName: string; lastName: string; email: string };
export type PlaceOrderCommand = {
    orderId: string;
    fullName: string;
    email: string;
    items: readonly {productId: string; quantity: number}[];
};

export function buildOrder(details: CustomerDetails, items: readonly CartItem[]): PlaceOrderCommand {
    if (!items.length)
        throw new Error('העגלה ריקה');
    if (items.some(item => !isValidQuantity(item.quantity)))
        throw new Error('כמות לא תקינה');

    const firstName = details.firstName.trim();
    const lastName = details.lastName.trim();
    const email = details.email.trim().toLowerCase();

    if(!firstName)
        throw new Error('יש למלא שם פרטי');
    if(!lastName)
        throw new Error('יש למלא שם משפחה');
    if(!isValidEmail(email))
        throw new Error('יש למלא כתובת מייל תקינה');


    return {
        orderId: crypto.randomUUID(), fullName: `${firstName} ${lastName}`, email,
        items: items.map(({productId, quantity}) => ({productId, quantity})),
    };
}
