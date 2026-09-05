using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Api.Application.Abstractions;
using Mod.Catalog.Api.Application.Catalog;
using Mod.Catalog.Api.Infrastructure.Persistence;
using Serilog;

var b = WebApplication.CreateBuilder(args);
var cs = b.Configuration.GetConnectionString("Catalog") ??
         throw new InvalidOperationException("Catalog connection string missing");
b.Services.AddDbContext<CatalogDbContext>(o =>
    o.UseSqlServer(cs, sql => sql.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null)));
b.Services.AddScoped<ICatalogReadRepository, EfCatalogReadRepository>();
b.Services.AddScoped<GetCatalogQuery>();
b.Services.AddHealthChecks().AddDbContextCheck<CatalogDbContext>();
b.Services.AddOpenApi();
var app = b.Build();
app.UseSerilogRequestLogging();
app.MapOpenApi();
app.MapHealthChecks("/health");
app.MapGet("/groceries", async (GetCatalogQuery q, CancellationToken ct) => Results.Ok(await q.ExecuteAsync(ct)));

using (var scope = app.Services.CreateScope())
{
    await CatalogSeeder.SeedAsync(scope.ServiceProvider.GetRequiredService<CatalogDbContext>());
}

app.Run();