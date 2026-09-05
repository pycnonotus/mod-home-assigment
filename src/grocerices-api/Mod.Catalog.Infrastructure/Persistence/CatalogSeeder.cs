using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Infrastructure.Persistence;

public static class CatalogSeeder
{
    public static async Task SeedAsync(CatalogDbContext dbContext, CancellationToken cancellationToken = default)
    {
        await dbContext.Database.MigrateAsync(cancellationToken);
        if (await dbContext.Categories.AnyAsync(cancellationToken)) return;

        var drinks = Category.Create(
            CategoryId.Create(Guid.Parse("83c05832-6e35-4463-8a63-8647282982e5")),
            CategoryName.Create("משקאות"));
        var food = Category.Create(
            CategoryId.Create(Guid.Parse("b1849d69-a88b-4718-a748-0216422272e9")),
            CategoryName.Create("אוכל"));

        dbContext.Categories.AddRange(drinks, food);
        dbContext.Products.AddRange(
            Product.Create(ProductId.Create(Guid.Parse("369b8de6-92ae-454c-b945-a2e8e9519f5b")),
                ProductName.Create("קפה"), drinks.Id),
            Product.Create(ProductId.Create(Guid.Parse("92f30e81-9323-4fae-95cf-b98f36f3c213")),
                ProductName.Create("מים"), drinks.Id),
            Product.Create(ProductId.Create(Guid.Parse("80b99bc2-3dd6-41fc-8a17-e197f95ea869")),
                ProductName.Create("לחם"), food.Id),
            Product.Create(ProductId.Create(Guid.Parse("29d6a72f-fad1-4b8b-9de1-e6773186eaf2")),
                ProductName.Create("גבינה"), food.Id));

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
