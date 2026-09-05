using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Api.Contracts;
using Mod.Catalog.Application.Abstractions;
using Mod.Catalog.Application.Catalog;
using Mod.Catalog.Application.Products;
using Mod.Catalog.Infrastructure.Persistence;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSerilog((services, configuration) => configuration
    .ReadFrom.Configuration(builder.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext()
    .WriteTo.Console());

var connectionString = builder.Configuration.GetConnectionString("Catalog") ??
                       throw new InvalidOperationException("Catalog connection string missing.");
builder.Services.AddDbContext<CatalogDbContext>(options => options.UseSqlServer(connectionString,
    sql => sql.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null)));
builder.Services.AddScoped<ICatalogReadRepository, EfCatalogReadRepository>();
builder.Services.AddScoped<GetCatalogQuery>();
builder.Services.AddScoped<ValidateProductsQuery>();
builder.Services.AddHealthChecks().AddDbContextCheck<CatalogDbContext>();
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();

var app = builder.Build();
app.UseExceptionHandler();
app.UseSerilogRequestLogging();
app.MapOpenApi();
app.MapHealthChecks("/health");
app.MapGet("/groceries", async (GetCatalogQuery query, CancellationToken ct) =>
    Results.Ok(await query.ExecuteAsync(ct)));
app.MapGet("/api/catalog", async (GetCatalogQuery query, CancellationToken ct) =>
    Results.Ok(await query.ExecuteAsync(ct)));
app.MapPost("/api/catalog/products/validate", async (
    ValidateProductsRequest request, ValidateProductsQuery query, CancellationToken ct) =>
{
    if (request.ProductIds is null || request.ProductIds.Any(id => id == Guid.Empty))
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["productIds"] = ["Provide an array of non-empty product IDs."]
        });
    }

    return Results.Ok(await query.ExecuteAsync(request.ProductIds, ct));
});

await using (var scope = app.Services.CreateAsyncScope())
{
    await CatalogSeeder.SeedAsync(scope.ServiceProvider.GetRequiredService<CatalogDbContext>(),
        app.Lifetime.ApplicationStopping);
}

app.Run();
