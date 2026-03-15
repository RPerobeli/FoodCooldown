# ==========================================
# ETAPA 1: Build do Frontend (React + Vite + TS)
# ==========================================
FROM node:20-alpine AS node-builder
WORKDIR /app/frontend

# Copia arquivos de dependências
COPY FoodCooldown/FrontCooldown/package*.json ./
RUN npm install

# Copia o restante do código do front e gera o build (gera a pasta /dist)
COPY FoodCooldown/FrontCooldown/ ./
RUN npm run build

# ==========================================
# ETAPA 2: Build do Backend (.NET 8)
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia o arquivo de projeto e restaura dependências
# Caminho ajustado: FoodCooldown (raiz) -> FoodCooldown (pasta do projeto)
COPY FoodCooldown/FoodCooldown/FoodCooldown.csproj ./
RUN dotnet restore

# Copia o código do backend e publica
COPY FoodCooldown/FoodCooldown/ ./
RUN dotnet publish -c Release -o /out

# ==========================================
# ETAPA 3: Imagem Final (Runtime)
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Cria a pasta de dados persistentes
RUN mkdir -p /app/Data

# Copia os arquivos compilados do .NET
COPY --from=build /out .

# Copia o build do Frontend (Vite gera /dist) para a pasta de arquivos estáticos do .NET
COPY --from=node-builder /app/frontend/dist ./wwwroot

# Copia o arquivo de dados específico para a pasta Data
COPY FoodCooldown/FoodCooldown/Data/foodData.txt /app/Data/

# Expõe as portas padrão do ASP.NET Core
# EXPOSE 80
# EXPOSE 443

ENTRYPOINT ["dotnet", "FoodCooldown.dll"]