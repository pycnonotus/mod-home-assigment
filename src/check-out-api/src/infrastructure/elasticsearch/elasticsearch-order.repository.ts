import {Client, errors} from "@elastic/elasticsearch";
import {Injectable, OnModuleInit} from "@nestjs/common";
import {readFile} from "node:fs/promises";
import type {OrderRepository} from "../../application/ports/order-repository";
import type {Order} from "../../domain/order/order";

@Injectable()

export class ElasticsearchOrderRepository
    implements OrderRepository, OnModuleInit {
    private readonly client = new Client({
        node: process.env.ELASTICSEARCH_NODE ?? "http://localhost:9200",
        auth: {
            username: process.env.ELASTICSEARCH_USERNAME ?? "elastic",
            password: process.env.ELASTICSEARCH_PASSWORD ?? "changeme",
        },
        maxRetries: 3,
        requestTimeout: 10000,
    });
    private readonly alias = process.env.ELASTICSEARCH_ORDERS_ALIAS ?? "orders";
    private readonly index = "orders-v1";

    async onModuleInit() {
        const exists = await this.client.indices.exists({index: this.index});
        if (!exists) {
            const mapping = JSON.parse(
                await readFile("mappings/orders-v1.mapping.json", "utf8"),
            );
            await this.client.indices.create({index: this.index, ...mapping});
            await this.client.indices.putAlias({
                index: this.index,
                name: this.alias,
                is_write_index: true,
            });
        }
    }

    async create(order: Order): Promise<"created" | "already-exists"> {
        try {
            await this.client.create({
                index: this.alias,
                id: order.id.value,
                document: {
                    orderId: order.id.value,
                    customer: {
                        fullName: order.customer.fullName,
                        email: order.customer.email,
                    },
                    items: order.items.map((i) => ({
                        productId: i.productId.value,
                        quantity: i.quantity.value,
                    })),
                    createdAt: order.createdAt.toISOString(),
                },
                refresh: "wait_for",
            });
            return "created";
        } catch (e) {
            if (e instanceof errors.ResponseError && e.statusCode === 409)
                return "already-exists";
            throw e;
        }
    }

}
