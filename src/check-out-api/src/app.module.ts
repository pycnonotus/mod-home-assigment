import {Module} from "@nestjs/common";
import {CreateOrder} from "./application/use-cases/create-order";
import {ORDER_REPOSITORY} from "./application/ports/order-repository";
import {PRODUCT_EXISTENCE} from "./application/ports/product-existence";
import {HttpCatalogClient} from "./infrastructure/catalog/http-catalog-client";
import {RedisProductExistenceAdapter} from "./infrastructure/catalog/redis-product-existence.adapter";
import {ElasticsearchOrderRepository} from "./infrastructure/elasticsearch/elasticsearch-order.repository";
import {OrdersController} from "./presentation/http/orders.controller";
import {HealthController} from "./presentation/http/health.controller";

@Module({
    controllers: [OrdersController, HealthController],
    providers: [
        CreateOrder,
        HttpCatalogClient,
        RedisProductExistenceAdapter,
        ElasticsearchOrderRepository,
        {provide: PRODUCT_EXISTENCE, useExisting: RedisProductExistenceAdapter},
        {provide: ORDER_REPOSITORY, useExisting: ElasticsearchOrderRepository},
    ],
})

export class AppModule {
}
