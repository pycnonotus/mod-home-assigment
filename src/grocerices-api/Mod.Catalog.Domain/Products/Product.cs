using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Common;

namespace Mod.Catalog.Domain.Products;

public sealed class Product
{
    private Product()
    {
    }

    private Product(ProductId id, ProductName name, CategoryId categoryId)
    {
        Id = id;
        Name = name;
        CategoryId = categoryId;
    }

    public ProductId Id { get; private set; }
    public ProductName Name { get; private set; } = null!;
    public CategoryId CategoryId { get; private set; }

    public static Product Create(ProductId id, ProductName name, CategoryId categoryId)
    {
        if (id.Value == Guid.Empty)
            throw new DomainException("ProductId cannot be empty.");

        if (categoryId.Value == Guid.Empty)
            throw new DomainException("CategoryId cannot be empty.");

        ArgumentNullException.ThrowIfNull(name);
        return new Product(id, name, categoryId);
    }
}
