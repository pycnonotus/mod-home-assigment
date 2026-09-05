using Mod.Catalog.Application.Abstractions;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Application.Products;

public sealed record ValidateProductsResult(
    IReadOnlyList<Guid> ExistingProductIds,
    IReadOnlyList<Guid> MissingProductIds);

public sealed class ValidateProductsQuery(ICatalogReadRepository repository)
{
    public async Task<ValidateProductsResult> ExecuteAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(ids);

        var uniqueIds = ids.Distinct().Select(ProductId.Create).ToArray();
        if (uniqueIds.Length == 0)
            return new ValidateProductsResult([], []);

        var existingIds = await repository.GetExistingProductIdsAsync(uniqueIds, cancellationToken);

        return new ValidateProductsResult(
            uniqueIds.Where(existingIds.Contains).Select(id => id.Value).ToArray(),
            uniqueIds.Where(id => !existingIds.Contains(id)).Select(id => id.Value).ToArray());
    }
}
