using Mod.Catalog.Domain.Common;

namespace Mod.Catalog.Domain.Categories;

public readonly record struct CategoryId
{
    private CategoryId(Guid value)
    {
        if (value == Guid.Empty)
            throw new DomainException("CategoryId cannot be empty.");

        Value = value;
    }

    public Guid Value { get; }

    public static CategoryId Create(Guid value) => new(value);

    public static CategoryId New() => new(Guid.NewGuid());

    public override string ToString() => Value.ToString();
}
