using Mod.Catalog.Api.Application.Abstractions;
using Mod.Catalog.Api.Contracts;

namespace Mod.Catalog.Api.Application.Catalog;

public sealed class GetCatalogQuery
{
    private readonly ICatalogReadRepository _repository;

    public GetCatalogQuery(ICatalogReadRepository repository)
    {
        _repository = repository;
    }

    public Task<IReadOnlyList<CategoryDto>> ExecuteAsync(CancellationToken cancellationToken = default)
    {
        return _repository.GetCatalogAsync(cancellationToken);
    }
}