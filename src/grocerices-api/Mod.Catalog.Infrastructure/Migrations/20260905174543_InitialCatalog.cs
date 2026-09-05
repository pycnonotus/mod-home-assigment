using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mod.Catalog.Infrastructure.Migrations;

public partial class InitialCatalog : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // Adopt the original EnsureCreated schema without dropping its data.
        // EF runs this batch and the migration history update in one transaction.
        migrationBuilder.Sql("""
            IF OBJECT_ID(N'dbo.Categories', N'U') IS NULL
                AND OBJECT_ID(N'dbo.Products', N'U') IS NULL
            BEGIN
                CREATE TABLE [dbo].[Categories] (
                    [Id] uniqueidentifier NOT NULL,
                    [Name] nvarchar(80) NOT NULL,
                    CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
                );
                CREATE TABLE [dbo].[Products] (
                    [Id] uniqueidentifier NOT NULL,
                    [Name] nvarchar(120) NOT NULL,
                    [CategoryId] uniqueidentifier NOT NULL,
                    CONSTRAINT [PK_Products] PRIMARY KEY ([Id]),
                    CONSTRAINT [FK_Products_Categories_CategoryId]
                        FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id]) ON DELETE CASCADE
                );
                CREATE INDEX [IX_Products_CategoryId] ON [dbo].[Products] ([CategoryId]);
            END
            ELSE
            BEGIN
                IF OBJECT_ID(N'dbo.Categories', N'U') IS NULL
                    OR OBJECT_ID(N'dbo.Products', N'U') IS NULL
                    THROW 51000, 'Catalog migration requires both legacy tables or an empty database.', 1;

                IF (
                    SELECT COUNT(*) FROM sys.columns
                    WHERE [object_id] IN (OBJECT_ID(N'dbo.Categories'), OBJECT_ID(N'dbo.Products'))
                        AND [is_nullable] = 0
                        AND (
                            ([name] = N'Id' AND TYPE_NAME([system_type_id]) = N'uniqueidentifier')
                            OR ([name] = N'Name' AND TYPE_NAME([system_type_id]) = N'nvarchar'
                                AND [max_length] IN (160, 240, 400))
                            OR ([object_id] = OBJECT_ID(N'dbo.Products') AND [name] = N'CategoryId'
                                AND TYPE_NAME([system_type_id]) = N'uniqueidentifier')
                        )
                ) <> 5
                    THROW 51001, 'Catalog tables do not match the supported legacy schema.', 1;

                -- Match the whitespace characters accepted by .NET string.Trim.
                DECLARE @whitespace nvarchar(32) = NCHAR(9) + NCHAR(10) + NCHAR(11) + NCHAR(12)
                    + NCHAR(13) + NCHAR(32) + NCHAR(133) + NCHAR(160) + NCHAR(5760)
                    + NCHAR(8192) + NCHAR(8193) + NCHAR(8194) + NCHAR(8195) + NCHAR(8196)
                    + NCHAR(8197) + NCHAR(8198) + NCHAR(8199) + NCHAR(8200) + NCHAR(8201)
                    + NCHAR(8202) + NCHAR(8232) + NCHAR(8233) + NCHAR(8239) + NCHAR(8287) + NCHAR(12288);

                IF EXISTS (SELECT 1 FROM [dbo].[Categories]
                    WHERE DATALENGTH([Name]) > 160 OR DATALENGTH(TRIM(@whitespace FROM [Name])) < 4
                        OR [Id] = '00000000-0000-0000-0000-000000000000')
                    THROW 51002, 'Existing categories have invalid IDs or names; correct them before migrating.', 1;
                IF EXISTS (SELECT 1 FROM [dbo].[Products]
                    WHERE DATALENGTH([Name]) > 240 OR DATALENGTH(TRIM(@whitespace FROM [Name])) < 4
                        OR [Id] = '00000000-0000-0000-0000-000000000000'
                        OR [CategoryId] = '00000000-0000-0000-0000-000000000000')
                    THROW 51003, 'Existing products have invalid IDs or names; correct them before migrating.', 1;

                ALTER TABLE [dbo].[Categories] ALTER COLUMN [Name] nvarchar(80) NOT NULL;
                ALTER TABLE [dbo].[Products] ALTER COLUMN [Name] nvarchar(120) NOT NULL;
            END
            """);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // These tables may predate EF migrations and contain user data.
        migrationBuilder.Sql("THROW 51004, 'The initial catalog migration cannot be reverted automatically.', 1;");
    }
}
