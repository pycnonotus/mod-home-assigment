using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Application.Abstractions;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Infrastructure.Persistence;

public sealed class EfCatalogReadRepository(CatalogDbContext dbContext) : ICatalogReadRepository
{
    public async Task<IReadOnlyList<Category>> GetCatalogAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Categories
            .AsNoTracking()
            .Include(category => category.Products.OrderBy(product => product.Name))
            .OrderBy(category => category.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlySet<ProductId>> GetExistingProductIdsAsync(
        IReadOnlyCollection<ProductId> ids,
        CancellationToken cancellationToken = default)
    {
        if (ids.Count == 0) return new HashSet<ProductId>();

        var productIds = ids.ToArray();
        var existing = await dbContext.Products
            .AsNoTracking()
            .Where(product => productIds.Contains(product.Id))
            .Select(product => product.Id)
            .ToListAsync(cancellationToken);

        return existing.ToHashSet();
    }
}
