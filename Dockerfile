# Etapa 1: Build da aplica��o
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia o arquivo de projeto e restaura depend�ncias
COPY ./FoodCooldown/FoodCooldown/FoodCooldown.csproj .
RUN dotnet restore

# Copia o restante do c�digo e publica a aplica��o
COPY FoodCooldown/FoodCooldown .
RUN dotnet publish -c Release -o /out

# Etapa 2: Criar a imagem final
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Cria a pasta Data
RUN mkdir -p /app/Data

# Copia os arquivos compilados
COPY --from=build /out .

# Copia o arquivo foodData.txt para a pasta /app/Data (se n�o for copiado na primeira etapa)
COPY FoodCooldown/FoodCooldown/Data/foodData.txt /app/Data/

# Define o comando de inicializa��o
ENTRYPOINT ["dotnet", "FoodCooldown.dll"]