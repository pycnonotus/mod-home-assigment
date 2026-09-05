using Mod.Catalog.Domain.Common;

namespace Mod.Catalog.Domain.Products;

public sealed record ProductName
{
    private ProductName(string value)
    {
        Value = value;
    }

    public string Value { get; }

    public static ProductName Create(string? value)
    {
        var name = value?.Trim();
        if (name is null || name.Length is < 2 or > 120)
            throw new DomainException("Product name must be 2-120 chars.");

        return new ProductName(name);
    }

    public override string ToString() => Value;
}
