import {Injectable, OnModuleDestroy} from '@nestjs/common';
import Redis from 'ioredis';
import type {ProductExistence} from '../../application/ports/product-existence';
import type {ProductId} from '../../domain/order/product-id';
import {HttpCatalogClient} from './http-catalog-client';

@Injectable()
export class RedisProductExistenceAdapter implements ProductExistence, OnModuleDestroy {
    private readonly redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');
    private readonly ttl = Number(process.env.PRODUCT_EXISTS_TTL_SECONDS ?? 300);

    constructor(private readonly catalog: HttpCatalogClient) {
    }

    async findMissing(ids: readonly ProductId[]) {
        const unique = [...new Map(ids.map(x => [x.value, x])).values()];
        const keys = unique.map(x => `catalog:product-exists:${x.value}`);

        const cached = keys.length ? await this.redis.mget(keys) : [];

        const unknown = unique.filter((_, i) => cached[i] !== '1');
        if (!unknown.length) return [];

        const missingValues = await this.catalog.findMissing(unknown.map(x => x.value));
        const missingSet = new Set(missingValues);
        const pipeline = this.redis.pipeline();

        unknown.filter(x => !missingSet.has(x.value)).forEach(x => pipeline.set(`catalog:product-exists:${x.value}`, '1', 'EX', this.ttl));
        if (unknown.some(x => !missingSet.has(x.value))) await pipeline.exec();
        return unknown.filter(x => missingSet.has(x.value));
    }

    async onModuleDestroy() {
        await this.redis.quit();
    }
}
