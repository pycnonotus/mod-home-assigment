# Catalog API

.NET 10 catalog service, following the DDD structure of `ModHomeAssignment.sln`.

- `Mod.Catalog.Domain`: categories, products, validated IDs and names; no framework dependencies.
- `Mod.Catalog.Application`: repository abstraction, catalog query, and product validation. Depends only on Domain.
- `Mod.Catalog.Infrastructure`: SQL Server, EF Core mappings, migrations, seeding, and repository implementation.
- `Mod.Catalog.Api`: HTTP contracts, endpoints, and dependency registration.
- `Mod.Catalog.Tests`: domain, application, and EF mapping regression tests.

`ICatalogReadRepository` returns domain types. Application queries map them into results with primitive GUIDs and strings.

## Run with Docker

From this directory, with Docker Desktop running Linux containers:

```powershell
Copy-Item .env.example .env
# Set SA_PASSWORD in .env, then start the services.
docker compose up --build -d --wait
```

Compose starts the catalog API and SQL Server. The API waits for SQL Server to be healthy, then applies migrations and seeds the catalog before serving requests. SQL Server data is stored in the persistent `sql-data` volume.

Open `http://localhost:5004/groceries`, `http://localhost:5004/health`, or `http://localhost:5004/openapi/v1.json`. `CATALOG_API_PORT` in `.env` changes the host port. SQL Server is accessible to the API inside the Docker network.

The React client can continue running through its existing Vite development command; its proxy already targets port 5004.

```powershell
docker compose ps
docker compose logs -f catalog-api
docker compose down
```

`docker compose down` preserves the database volume for the next start. Keep the same `SA_PASSWORD` when reusing it. Ordering and its dependencies will be added later.

## Run locally

Install the .NET 10 SDK and provide a SQL Server connection using `ConnectionStrings__Catalog` or local configuration. The default connection in `appsettings.json` uses Windows authentication against localhost.

```powershell
dotnet run --project Mod.Catalog.Api --launch-profile http
```

The API listens on `http://localhost:5004`. Startup applies migrations and seeds an empty catalog with the existing category/product GUIDs and Hebrew labels.

The initial migration also adopts the previous `EnsureCreated` catalog schema. It preserves rows and rejects incompatible columns, invalid IDs, or names that cannot fit the new limits (80 characters for categories, 120 for products). Correct rejected data before retrying. Automatic rollback of this initial migration is disabled to protect pre-existing tables.

## Endpoints

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/groceries` | Catalog grouped by category; existing client route. |
| GET | `/api/catalog` | Same catalog using the reference route. |
| POST | `/api/catalog/products/validate` | Returns distinct existing and missing product IDs. |
| GET | `/health` | Checks SQL Server connectivity. |
| GET | `/openapi/v1.json` | OpenAPI document. |

Validation request:

```json
{"productIds":["369b8de6-92ae-454c-b945-a2e8e9519f5b"]}
```

Response:

```json
{"existingProductIds":["369b8de6-92ae-454c-b945-a2e8e9519f5b"],"missingProductIds":[]}
```

Missing/null arrays, malformed GUIDs, and empty GUIDs return HTTP 400. An empty array returns two empty arrays; unknown valid GUIDs appear in `missingProductIds` with HTTP 200.

## Verify and build

```powershell
dotnet build grocerices-api.slnx
dotnet test grocerices-api.slnx
docker build -f Mod.Catalog.Api/Dockerfile -t mod-catalog-api .
```

Tests run without a database. EF mapping tests verify SQL translation, relationship fixup, and migration/model consistency. Use the service's SQL Server connection when running the built container, which listens on port 8080.

To add a migration with the .NET EF tool installed:

```powershell
dotnet ef migrations add MigrationName --project Mod.Catalog.Infrastructure --startup-project Mod.Catalog.Api
```
