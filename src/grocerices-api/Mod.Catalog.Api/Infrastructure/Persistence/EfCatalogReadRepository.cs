using Microsoft.EntityFrameworkCore;
using Mod.Catalog.Api.Application.Abstractions;
using Mod.Catalog.Api.Contracts;

namespace Mod.Catalog.Api.Infrastructure.Persistence;

public class EfCatalogReadRepository(CatalogDbContext dbContext) : ICatalogReadRepository
{
    public async Task<IReadOnlyList<CategoryDto>> GetCatalogAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Categories
            .AsNoTracking()
            .Include(c => c.Products)
            .Select(c => new CategoryDto(
                c.Id,
                c.Name,
                c.Products.Select(p => new ProductDto(p.Id, p.Name)).ToList()
            ))
            .ToListAsync(cancellationToken);
    }
}