using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Application.Abstractions;

public interface ICatalogReadRepository
{
    Task<IReadOnlyList<Category>> GetCatalogAsync(CancellationToken cancellationToken = default);

    Task<IReadOnlySet<ProductId>> GetExistingProductIdsAsync(
        IReadOnlyCollection<ProductId> ids,
        CancellationToken cancellationToken = default);
}
