using Mod.Catalog.Api.Contracts;

namespace Mod.Catalog.Api.Application.Abstractions;

public interface ICatalogReadRepository
{
    Task<IReadOnlyList<CategoryDto>> GetCatalogAsync(CancellationToken cancellationToken = default);
}