import type {Order} from '../../domain/order/order';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface OrderRepository {
    create(order: Order): Promise<'created' | 'already-exists'>;
}
