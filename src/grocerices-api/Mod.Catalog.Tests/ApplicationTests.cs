using Mod.Catalog.Application.Catalog;
using Mod.Catalog.Application.Products;
using Mod.Catalog.Domain.Categories;
using Mod.Catalog.Domain.Common;
using Mod.Catalog.Domain.Products;
using Xunit;

namespace Mod.Catalog.Tests;

public sealed class ApplicationTests
{
    [Fact]
    public async Task Validation_deduplicates_and_partitions_ids_in_request_order()
    {
        var firstExisting = ProductId.New();
        var secondExisting = ProductId.New();
        var firstMissing = ProductId.New();
        var secondMissing = ProductId.New();
        var repository = new FakeCatalogReadRepository
        {
            ExistingIds = new HashSet<ProductId> { secondExisting, firstExisting }
        };
        var query = new ValidateProductsQuery(repository);
        using var cancellation = new CancellationTokenSource();

        var result = await query.ExecuteAsync(
            [firstMissing.Value, firstExisting.Value, firstMissing.Value, secondExisting.Value,
                firstExisting.Value, secondMissing.Value], cancellation.Token);

        Assert.Equal(new[] { firstMissing, firstExisting, secondExisting, secondMissing }, repository.RequestedIds);
        Assert.Equal(new[] { firstExisting.Value, secondExisting.Value }, result.ExistingProductIds);
        Assert.Equal(new[] { firstMissing.Value, secondMissing.Value }, result.MissingProductIds);
        Assert.Equal(cancellation.Token, repository.ReceivedCancellationToken);
        Assert.Equal(1, repository.ExistingIdsCalls);
    }

    [Fact]
    public async Task Empty_validation_returns_empty_partitions_without_database_work()
    {
        var repository = new FakeCatalogReadRepository();

        var result = await new ValidateProductsQuery(repository).ExecuteAsync([], CancellationToken.None);

        Assert.Empty(result.ExistingProductIds);
        Assert.Empty(result.MissingProductIds);
        Assert.Equal(0, repository.ExistingIdsCalls);
    }

    [Fact]
    public async Task Invalid_validation_inputs_are_rejected_before_database_work()
    {
        var repository = new FakeCatalogReadRepository();
        var query = new ValidateProductsQuery(repository);

        await Assert.ThrowsAsync<ArgumentNullException>(() => query.ExecuteAsync(null!, CancellationToken.None));
        await Assert.ThrowsAsync<DomainException>(() =>
            query.ExecuteAsync([Guid.NewGuid(), Guid.Empty], CancellationToken.None));

        Assert.Equal(0, repository.ExistingIdsCalls);
    }

    [Fact]
    public async Task Queries_propagate_repository_cancellation()
    {
        var repository = new FakeCatalogReadRepository();
        using var cancellation = new CancellationTokenSource();
        await cancellation.CancelAsync();

        await Assert.ThrowsAnyAsync<OperationCanceledException>(() =>
            new ValidateProductsQuery(repository).ExecuteAsync([Guid.NewGuid()], cancellation.Token));
        await Assert.ThrowsAnyAsync<OperationCanceledException>(() =>
            new GetCatalogQuery(repository).ExecuteAsync(cancellation.Token));

        Assert.Equal(cancellation.Token, repository.ReceivedCancellationToken);
    }

    [Fact]
    public async Task Catalog_maps_category_values_and_forwards_cancellation()
    {
        var category = Category.Create(CategoryId.New(), CategoryName.Create(" Dairy "));
        var repository = new FakeCatalogReadRepository { Catalog = [category] };
        using var cancellation = new CancellationTokenSource();

        var result = await new GetCatalogQuery(repository).ExecuteAsync(cancellation.Token);

        var mapped = Assert.Single(result);
        Assert.Equal(category.Id.Value, mapped.Id);
        Assert.Equal("Dairy", mapped.Name);
        Assert.Empty(mapped.Products);
        Assert.Equal(cancellation.Token, repository.ReceivedCancellationToken);
        Assert.Equal(1, repository.CatalogCalls);
    }

    [Fact]
    public async Task Empty_catalog_maps_to_an_empty_result()
    {
        var result = await new GetCatalogQuery(new FakeCatalogReadRepository())
            .ExecuteAsync(CancellationToken.None);

        Assert.Empty(result);
    }
}
