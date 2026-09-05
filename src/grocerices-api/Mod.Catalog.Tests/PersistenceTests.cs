using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Application.Catalog;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;
using Mod.Catalog.Infrastructure.Persistence;
using Xunit;

namespace Mod.Catalog.Tests;

public sealed class PersistenceTests
{
    private static CatalogDbContext CreateContext() => new(new DbContextOptionsBuilder<CatalogDbContext>()
        .UseSqlServer("Server=localhost;Database=CatalogModelTests;Integrated Security=True;TrustServerCertificate=True")
        .Options);

    [Fact]
    public void Strong_ids_and_read_only_navigation_translate_to_sql()
    {
        using var db = CreateContext();
        var ids = new[] { ProductId.New(), ProductId.New() };

        var productsSql = db.Products.Where(product => ids.Contains(product.Id))
            .Select(product => product.Id).ToQueryString();
        var catalogSql = db.Categories.AsNoTracking()
            .Include(category => category.Products.OrderBy(product => product.Name))
            .OrderBy(category => category.Name).ToQueryString();

        Assert.Contains("WHERE", productsSql);
        Assert.Contains("[Id]", productsSql);
        Assert.Contains("JOIN", catalogSql);
        Assert.Contains("ORDER BY", catalogSql);
    }

    [Fact]
    public async Task Ef_relationship_fixup_populates_read_only_products_and_catalog_results()
    {
        using var db = CreateContext();
        var category = Category.Create(CategoryId.New(), CategoryName.Create("Drinks"));
        var product = Product.Create(ProductId.New(), ProductName.Create("Water"), category.Id);
        db.Add(category);
        db.Add(product);

        Assert.Same(product, Assert.Single(category.Products));
        var results = await new GetCatalogQuery(new FakeCatalogReadRepository { Catalog = [category] })
            .ExecuteAsync();

        var mapped = Assert.Single(Assert.Single(results).Products);
        Assert.Equal(product.Id.Value, mapped.Id);
        Assert.Equal("Water", mapped.Name);
    }

    [Fact]
    public void Migration_snapshot_matches_current_model()
    {
        using var db = CreateContext();

        Assert.Single(db.Database.GetMigrations());
        Assert.False(db.Database.HasPendingModelChanges());
    }
}
