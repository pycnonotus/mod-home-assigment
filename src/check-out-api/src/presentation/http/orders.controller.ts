import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query} from '@nestjs/common';
import {CreateOrder} from '../../application/use-cases/create-order';
import {ProductsNotFoundError} from '../../application/errors/products-not-found.error';
import {DomainError} from '../../domain/shared/domain-error';
import {CreateOrderDto} from './dto/create-order.dto';

@Controller('api/orders')
export class OrdersController {
    constructor(private readonly createOrder: CreateOrder) {
    }

    @Post() @HttpCode(HttpStatus.CREATED) async create(@Body() dto: CreateOrderDto) {
        try {
            const result = await this.createOrder.execute(dto);
            return {orderId: dto.orderId, created: result === 'created'};
        } catch (e) {
            if (e instanceof ProductsNotFoundError) return Promise.reject(new BadRequestException({
                code: 'PRODUCT_NOT_FOUND',
                productIds: e.productIds
            }));
            if (e instanceof DomainError) return Promise.reject(new BadRequestException({
                code: 'INVALID_ORDER',
                message: e.message
            }));
            throw e;
        }
    }


}
