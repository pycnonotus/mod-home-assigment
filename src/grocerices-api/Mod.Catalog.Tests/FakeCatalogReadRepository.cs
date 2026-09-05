using Mod.Catalog.Application.Abstractions;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Tests;

internal sealed class FakeCatalogReadRepository : ICatalogReadRepository
{
    public IReadOnlyList<Category> Catalog { get; init; } = [];
    public IReadOnlySet<ProductId> ExistingIds { get; init; } = new HashSet<ProductId>();
    public IReadOnlyCollection<ProductId> RequestedIds { get; private set; } = [];
    public CancellationToken ReceivedCancellationToken { get; private set; }
    public int CatalogCalls { get; private set; }
    public int ExistingIdsCalls { get; private set; }

    public Task<IReadOnlyList<Category>> GetCatalogAsync(CancellationToken cancellationToken)
    {
        CatalogCalls++;
        ReceivedCancellationToken = cancellationToken;
        return cancellationToken.IsCancellationRequested
            ? Task.FromCanceled<IReadOnlyList<Category>>(cancellationToken)
            : Task.FromResult(Catalog);
    }

    public Task<IReadOnlySet<ProductId>> GetExistingProductIdsAsync(
        IReadOnlyCollection<ProductId> ids, CancellationToken cancellationToken)
    {
        ExistingIdsCalls++;
        RequestedIds = ids.ToArray();
        ReceivedCancellationToken = cancellationToken;
        return cancellationToken.IsCancellationRequested
            ? Task.FromCanceled<IReadOnlySet<ProductId>>(cancellationToken)
            : Task.FromResult(ExistingIds);
    }
}
