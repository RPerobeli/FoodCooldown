# Etapa 1: Build da aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia o arquivo de projeto e restaura dependências
COPY *.csproj ./
RUN dotnet restore

# Copia o restante do código e publica a aplicação
COPY . ./
RUN dotnet publish -c Release -o /out

# Etapa 2: Criar a imagem final
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Cria a pasta Data
RUN mkdir -p /app/Data

# Copia os arquivos compilados
COPY --from=build /out .

# Copia o arquivo foodData.txt para a pasta /app/Data (se não for copiado na primeira etapa)
COPY Data/foodData.txt /app/Data/

# Define o comando de inicialização
ENTRYPOINT ["dotnet", "FoodCooldown.dll"]