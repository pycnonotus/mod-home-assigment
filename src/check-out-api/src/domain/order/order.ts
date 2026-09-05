import {Customer} from './customer';
import {OrderId} from './order-id';
import {ProductId} from './product-id';
import {Quantity} from './quantity';

export class OrderItem {
    private constructor(readonly productId: ProductId, readonly quantity: Quantity) {
    }

    static create(productId: ProductId, quantity: Quantity) {
        return new OrderItem(productId, quantity);
    }
}

export class Order {
    private constructor(readonly id: OrderId, readonly customer: Customer, readonly items: readonly OrderItem[], readonly createdAt: Date) {
    }

    static create(id: OrderId, customer: Customer, items: readonly OrderItem[]) {
        if (!items.length) throw new Error('Order requires items');
        return new Order(id, customer, items, new Date());
    }
}
