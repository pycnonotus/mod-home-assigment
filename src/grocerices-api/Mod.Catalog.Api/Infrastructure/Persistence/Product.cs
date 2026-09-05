namespace Mod.Catalog.Api.Infrastructure.Persistence;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
}