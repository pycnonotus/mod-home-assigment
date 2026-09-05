using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Infrastructure.Persistence;

public static class CatalogSeeder
{
    public static async Task SeedAsync(CatalogDbContext dbContext, CancellationToken cancellationToken = default)
    {
        await dbContext.Database.MigrateAsync(cancellationToken);
        var categories = new (string Id, string Name, (string Id, string Name)[] Products)[]
        {
            ("83c05832-6e35-4463-8a63-8647282982e5", "משקאות", [
                ("369b8de6-92ae-454c-b945-a2e8e9519f5b", "קפה"),
                ("92f30e81-9323-4fae-95cf-b98f36f3c213", "מים"),
                ("a1100000-0000-4000-8000-000000000003", "תה ירוק"),
                ("a1100000-0000-4000-8000-000000000004", "מיץ תפוזים"),
                ("a1100000-0000-4000-8000-000000000005", "מיץ תפוחים"),
                ("a1100000-0000-4000-8000-000000000006", "סודה"),
                ("a1100000-0000-4000-8000-000000000007", "לימונדה"),
                ("a1100000-0000-4000-8000-000000000008", "שוקו")]),
            ("b1849d69-a88b-4718-a748-0216422272e9", "אוכל", [
                ("80b99bc2-3dd6-41fc-8a17-e197f95ea869", "לחם"),
                ("29d6a72f-fad1-4b8b-9de1-e6773186eaf2", "גבינה"),
                ("a1200000-0000-4000-8000-000000000003", "אורז"),
                ("a1200000-0000-4000-8000-000000000004", "פסטה"),
                ("a1200000-0000-4000-8000-000000000005", "קוסקוס"),
                ("a1200000-0000-4000-8000-000000000006", "עדשים"),
                ("a1200000-0000-4000-8000-000000000007", "טחינה"),
                ("a1200000-0000-4000-8000-000000000008", "טונה")]),
            ("c1300000-0000-4000-8000-000000000001", "פירות", [
                ("a1300000-0000-4000-8000-000000000001", "תפוחים"),
                ("a1300000-0000-4000-8000-000000000002", "בננות"),
                ("a1300000-0000-4000-8000-000000000003", "תפוזים"),
                ("a1300000-0000-4000-8000-000000000004", "אגסים"),
                ("a1300000-0000-4000-8000-000000000005", "ענבים"),
                ("a1300000-0000-4000-8000-000000000006", "תותים"),
                ("a1300000-0000-4000-8000-000000000007", "אבטיח"),
                ("a1300000-0000-4000-8000-000000000008", "מנגו")]),
            ("c1400000-0000-4000-8000-000000000001", "ירקות", [
                ("a1400000-0000-4000-8000-000000000001", "עגבניות"),
                ("a1400000-0000-4000-8000-000000000002", "מלפפונים"),
                ("a1400000-0000-4000-8000-000000000003", "גזר"),
                ("a1400000-0000-4000-8000-000000000004", "תפוחי אדמה"),
                ("a1400000-0000-4000-8000-000000000005", "בצל"),
                ("a1400000-0000-4000-8000-000000000006", "פלפל אדום"),
                ("a1400000-0000-4000-8000-000000000007", "חסה"),
                ("a1400000-0000-4000-8000-000000000008", "ברוקולי")]),
            ("c1500000-0000-4000-8000-000000000001", "חטיפים וממתקים", [
                ("a1500000-0000-4000-8000-000000000001", "במבה"),
                ("a1500000-0000-4000-8000-000000000002", "ביסלי"),
                ("a1500000-0000-4000-8000-000000000003", "בייגלה"),
                ("a1500000-0000-4000-8000-000000000004", "פופקורן"),
                ("a1500000-0000-4000-8000-000000000005", "שוקולד מריר"),
                ("a1500000-0000-4000-8000-000000000006", "עוגיות"),
                ("a1500000-0000-4000-8000-000000000007", "ופלים"),
                ("a1500000-0000-4000-8000-000000000008", "סוכריות גומי")])
        };

        var existingCategoryIds = (await dbContext.Categories.Select(category => category.Id)
            .ToListAsync(cancellationToken)).ToHashSet();
        var existingProductIds = (await dbContext.Products.Select(product => product.Id)
            .ToListAsync(cancellationToken)).ToHashSet();

        foreach (var category in categories)
        {
            var categoryId = CategoryId.Create(Guid.Parse(category.Id));
            if (!existingCategoryIds.Contains(categoryId))
                dbContext.Categories.Add(Category.Create(categoryId, CategoryName.Create(category.Name)));

            foreach (var product in category.Products)
            {
                var productId = ProductId.Create(Guid.Parse(product.Id));
                if (!existingProductIds.Contains(productId))
                    dbContext.Products.Add(Product.Create(productId, ProductName.Create(product.Name), categoryId));
            }
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
