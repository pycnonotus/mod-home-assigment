import {Inject, Injectable} from '@nestjs/common';
import {Customer} from '../../domain/order/customer';
import {Order, OrderItem} from '../../domain/order/order';
import {OrderId} from '../../domain/order/order-id';
import {ProductId} from '../../domain/order/product-id';
import {Quantity} from '../../domain/order/quantity';
import {ORDER_REPOSITORY, type OrderRepository} from '../ports/order-repository';
import {PRODUCT_EXISTENCE, type ProductExistence} from '../ports/product-existence';
import {ProductsNotFoundError} from '../errors/products-not-found.error';
import {CreateOrderCommand} from "./create-order-command";

@Injectable()
export class CreateOrder {
    constructor(
        @Inject(PRODUCT_EXISTENCE)
        private readonly products: ProductExistence,
        @Inject(ORDER_REPOSITORY)
        private readonly orders: OrderRepository) {
    }

    async execute(createOrderCommand: CreateOrderCommand) {
        const id = OrderId.create(createOrderCommand.orderId);

        const customer = Customer.create(createOrderCommand.fullName, createOrderCommand.email);
        const idsAndQuantity = await this.extractIdAndQuantity(createOrderCommand);

        const order = Order.create(id, customer, idsAndQuantity);
        return this.orders.create(order);
    }

    private async extractIdAndQuantity(createOrderCommand: CreateOrderCommand) {
        const items = createOrderCommand.items.map(i => OrderItem.create(ProductId.create(i.productId), Quantity.create(i.quantity)));
        const unique = [...new Map(items.map(i => [i.productId.value, i.productId])).values()];

        const missing = await this.products.findMissing(unique);
        if (missing.length)
            throw new ProductsNotFoundError(missing.map(x => x.value));

        return items;
    }
}
