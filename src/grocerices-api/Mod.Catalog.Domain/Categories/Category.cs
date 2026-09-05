using Mod.Catalog.Domain.Common;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Domain.Categories;

public sealed class Category
{
    private readonly List<Product> _products = [];

    private Category()
    {
        Products = _products.AsReadOnly();
    }

    private Category(CategoryId id, CategoryName name) : this()
    {
        Id = id;
        Name = name;
    }

    public CategoryId Id { get; private set; }
    public CategoryName Name { get; private set; } = null!;
    public IReadOnlyCollection<Product> Products { get; }

    public static Category Create(CategoryId id, CategoryName name)
    {
        if (id.Value == Guid.Empty)
            throw new DomainException("CategoryId cannot be empty.");

        ArgumentNullException.ThrowIfNull(name);
        return new Category(id, name);
    }
}
