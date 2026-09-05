namespace Mod.Catalog.Api.Contracts;

public sealed record CategoryDto(Guid Id, string Name, IReadOnlyList<ProductDto> Products);