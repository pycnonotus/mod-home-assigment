using Mod.Catalog.Domain.Common;

namespace Mod.Catalog.Domain.Categories;

public sealed record CategoryName
{
    private CategoryName(string value)
    {
        Value = value;
    }

    public string Value { get; }

    public static CategoryName Create(string? value)
    {
        var name = value?.Trim();
        if (name is null || name.Length is < 2 or > 80)
            throw new DomainException("Category name must be 2-80 chars.");

        return new CategoryName(name);
    }

    public override string ToString() => Value;
}
