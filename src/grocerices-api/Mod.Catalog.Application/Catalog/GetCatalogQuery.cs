using Mod.Catalog.Application.Abstractions;

namespace Mod.Catalog.Application.Catalog;

public sealed record ProductResult(Guid Id, string Name);

public sealed record CategoryResult(Guid Id, string Name, IReadOnlyList<ProductResult> Products);

public sealed class GetCatalogQuery(ICatalogReadRepository repository)
{
    public async Task<IReadOnlyList<CategoryResult>> ExecuteAsync(CancellationToken cancellationToken = default)
    {
        var categories = await repository.GetCatalogAsync(cancellationToken);

        return categories.Select(category => new CategoryResult(
            category.Id.Value,
            category.Name.Value,
            category.Products.Select(product => new ProductResult(product.Id.Value, product.Name.Value)).ToArray()))
            .ToArray();
    }
}
