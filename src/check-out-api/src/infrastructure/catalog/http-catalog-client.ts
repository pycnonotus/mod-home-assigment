import {Injectable} from '@nestjs/common';

@Injectable()
export class HttpCatalogClient {
    private readonly base = process.env.CATALOG_BASE_URL ?? 'http://localhost:5000';

    async findMissing(ids: readonly string[]): Promise<readonly string[]> {
        const response = await fetch(`${this.base}/api/catalog/products/validate`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({productIds: ids})
        });

        if (!response.ok)
            throw new Error(`Catalog validation failed: ${response.status}`);

        return ((
                (await response.json())
            ) as { missingProductIds: string[] }
        ).missingProductIds;

    }
}
