namespace Mod.Catalog.Api.Infrastructure.Persistence;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<Product> Products { get; set; } = new();
}