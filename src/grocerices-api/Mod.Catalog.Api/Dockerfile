FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
USER $APP_UID
WORKDIR /app
EXPOSE 8080

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

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Mod.Catalog.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish --no-restore /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mod.Catalog.Api.dll"]
