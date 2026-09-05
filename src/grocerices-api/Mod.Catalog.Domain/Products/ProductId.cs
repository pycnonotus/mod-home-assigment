using Mod.Catalog.Domain.Common;

namespace Mod.Catalog.Domain.Products;

public readonly record struct ProductId
{
    private ProductId(Guid value)
    {
        if (value == Guid.Empty)
            throw new DomainException("ProductId cannot be empty.");

        Value = value;
    }

    public Guid Value { get; }

    public static ProductId Create(Guid value) => new(value);

    public static ProductId New() => new(Guid.NewGuid());

    public override string ToString() => Value.ToString();
}
