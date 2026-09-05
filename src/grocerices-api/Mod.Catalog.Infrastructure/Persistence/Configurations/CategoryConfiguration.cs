using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mod.Catalog.Domain.Categories;

namespace Mod.Catalog.Infrastructure.Persistence.Configurations;

public sealed class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasKey(category => category.Id);
        builder.Property(category => category.Id)
            .HasConversion(id => id.Value, value => CategoryId.Create(value))
            .ValueGeneratedNever();
        builder.Property(category => category.Name)
            .HasConversion(name => name.Value, value => CategoryName.Create(value))
            .HasMaxLength(80)
            .IsRequired();
        builder.HasMany(category => category.Products)
            .WithOne()
            .HasForeignKey(product => product.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.Navigation(category => category.Products)
            .HasField("_products")
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}
