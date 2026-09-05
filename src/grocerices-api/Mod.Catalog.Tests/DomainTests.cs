using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Common;
using Mod.Catalog.Domain.Products;
using Xunit;

namespace Mod.Catalog.Tests;

public sealed class DomainTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" \t\r\n ")]
    [InlineData(" A ")]
    public void Names_reject_missing_or_short_values(string? value)
    {
        Assert.Throws<DomainException>(() => CategoryName.Create(value));
        Assert.Throws<DomainException>(() => ProductName.Create(value));
    }

    [Theory]
    [InlineData(2)]
    [InlineData(80)]
    public void Category_name_accepts_trimmed_length_boundaries(int length)
    {
        var expected = new string('A', length);

        var name = CategoryName.Create($" \t{expected}\r\n ");

        Assert.Equal(expected, name.Value);
        Assert.Equal(CategoryName.Create(expected), name);
    }

    [Theory]
    [InlineData(2)]
    [InlineData(120)]
    public void Product_name_accepts_trimmed_length_boundaries(int length)
    {
        var expected = new string('A', length);

        var name = ProductName.Create($" \t{expected}\r\n ");

        Assert.Equal(expected, name.Value);
        Assert.Equal(ProductName.Create(expected), name);
    }

    [Fact]
    public void Names_reject_values_over_their_maximum_lengths()
    {
        Assert.Throws<DomainException>(() => CategoryName.Create(new string('A', 81)));
        Assert.Throws<DomainException>(() => ProductName.Create(new string('A', 121)));
    }

    [Fact]
    public void Id_factories_reject_empty_guids_and_preserve_valid_values()
    {
        Assert.Throws<DomainException>(() => CategoryId.Create(Guid.Empty));
        Assert.Throws<DomainException>(() => ProductId.Create(Guid.Empty));

        var value = Guid.NewGuid();
        Assert.Equal(value, CategoryId.Create(value).Value);
        Assert.Equal(value, ProductId.Create(value).Value);
        Assert.NotEqual(Guid.Empty, CategoryId.New().Value);
        Assert.NotEqual(Guid.Empty, ProductId.New().Value);
    }

    [Fact]
    public void Entity_factories_reject_default_ids_that_bypass_id_factories()
    {
        var name = ProductName.Create("Milk");

        Assert.Throws<DomainException>(() => Category.Create(default, CategoryName.Create("Dairy")));
        Assert.Throws<DomainException>(() => Product.Create(default, name, CategoryId.New()));
        Assert.Throws<DomainException>(() => Product.Create(ProductId.New(), name, default));
    }

    [Fact]
    public void Entity_factories_reject_null_names()
    {
        Assert.Throws<ArgumentNullException>(() => Category.Create(CategoryId.New(), null!));
        Assert.Throws<ArgumentNullException>(() => Product.Create(ProductId.New(), null!, CategoryId.New()));
    }

    [Fact]
    public void Entity_factories_preserve_values_and_protect_product_collection()
    {
        var categoryId = CategoryId.New();
        var categoryName = CategoryName.Create("Dairy");
        var category = Category.Create(categoryId, categoryName);
        var productId = ProductId.New();
        var productName = ProductName.Create("Milk");
        var product = Product.Create(productId, productName, categoryId);

        Assert.Equal(categoryId, category.Id);
        Assert.Equal(categoryName, category.Name);
        Assert.Empty(category.Products);
        Assert.Equal(productId, product.Id);
        Assert.Equal(productName, product.Name);
        Assert.Equal(categoryId, product.CategoryId);
        if (category.Products is ICollection<Product> collection)
        {
            Assert.True(collection.IsReadOnly);
            Assert.Throws<NotSupportedException>(() => collection.Add(product));
        }
    }
}
