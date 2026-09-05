namespace Mod.Catalog.Api.Contracts;

public sealed record ValidateProductsRequest(IReadOnlyCollection<Guid>? ProductIds);
