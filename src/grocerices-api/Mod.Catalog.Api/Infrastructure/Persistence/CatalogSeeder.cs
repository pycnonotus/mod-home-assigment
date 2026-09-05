using Microsoft.EntityFrameworkCore;

namespace Mod.Catalog.Api.Infrastructure.Persistence;

public static class CatalogSeeder
{
    public static async Task SeedAsync(CatalogDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (await context.Categories.AnyAsync()) return;

        var drinks = new Category
        {
            Id = Guid.Parse("83c05832-6e35-4463-8a63-8647282982e5"),
            Name = "משקאות",
            Products = new List<Product>
            {
                new()
                {
                    Id = Guid.Parse("369b8de6-92ae-454c-b945-a2e8e9519f5b"),
                    Name = "קפה"
                },
                new()
                {
                    Id = Guid.Parse("92f30e81-9323-4fae-95cf-b98f36f3c213"),
                    Name = "מיפ"
                }
            }
        };

        var food = new Category
        {
            Id = Guid.Parse("b1849d69-a88b-4718-a748-0216422272e9"),
            Name = "אוכל",
            Products = new List<Product>
            {
                new()
                {
                    Id = Guid.Parse("80b99bc2-3dd6-41fc-8a17-e197f95ea869"),
                    Name = "לחם"
                },
                new()
                {
                    Id = Guid.Parse("29d6a72f-fad1-4b8b-9de1-e6773186eaf2"),
                    Name = "גבינה"
                }
            }
        };

        context.Categories.AddRange(drinks, food);
        await context.SaveChangesAsync();
    }
}