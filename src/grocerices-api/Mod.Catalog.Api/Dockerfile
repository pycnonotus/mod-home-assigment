FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Mod.Catalog.Api/Mod.Catalog.Api.csproj", "Mod.Catalog.Api/"]
COPY ["Mod.Catalog.Application/Mod.Catalog.Application.csproj", "Mod.Catalog.Application/"]
COPY ["Mod.Catalog.Domain/Mod.Catalog.Domain.csproj", "Mod.Catalog.Domain/"]
COPY ["Mod.Catalog.Infrastructure/Mod.Catalog.Infrastructure.csproj", "Mod.Catalog.Infrastructure/"]
RUN dotnet restore "Mod.Catalog.Api/Mod.Catalog.Api.csproj"
COPY . .
WORKDIR "/src/Mod.Catalog.Api"
RUN dotnet build "./Mod.Catalog.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Mod.Catalog.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mod.Catalog.Api.dll"]
