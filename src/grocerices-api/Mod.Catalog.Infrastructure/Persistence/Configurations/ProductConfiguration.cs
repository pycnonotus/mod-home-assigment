using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Products;

namespace Mod.Catalog.Infrastructure.Persistence.Configurations;

public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(product => product.Id);
        builder.Property(product => product.Id)
            .HasConversion(id => id.Value, value => ProductId.Create(value))
            .ValueGeneratedNever();
        builder.Property(product => product.Name)
            .HasConversion(name => name.Value, value => ProductName.Create(value))
            .HasMaxLength(120)
            .IsRequired();
        builder.Property(product => product.CategoryId)
            .HasConversion(id => id.Value, value => CategoryId.Create(value));
        builder.HasIndex(product => product.CategoryId);
    }
}
