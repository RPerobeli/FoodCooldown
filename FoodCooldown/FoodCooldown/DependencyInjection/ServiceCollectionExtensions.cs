using FoodCooldown.Repository;
using FoodCooldown.Services;
using FoodCooldown.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace  FoodCooldown.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDependenciasFoodCooldown(this IServiceCollection services, IConfiguration configuration)
        {
            // 1. Vincula a seção "MongoSettings" do appsettings à classe fortemente tipada
            services.Configure<MongoSettings>(
                configuration.GetSection("MongoSettings"));
            
            // 2. Registra o IMongoClient como Singleton
            services.AddSingleton<IMongoClient>(serviceProvider =>
            {
                var settings = serviceProvider.GetRequiredService<IOptions<MongoSettings>>().Value;
                return new MongoClient(settings.ConnectionString);
            });
            
            // 3. (Opcional, mas recomendado) Registra o IMongoDatabase diretamente
            // Isso facilita na hora de injetar nos seus repositórios, pois você já recebe o banco selecionado
            services.AddScoped<IMongoDatabase>(serviceProvider =>
            {
                var client = serviceProvider.GetRequiredService<IMongoClient>();
                var settings = serviceProvider.GetRequiredService<IOptions<MongoSettings>>().Value;
                return client.GetDatabase(settings.DatabaseName);
            });


            services.AddScoped<FoodService,FoodService>();
            services.AddScoped<IFoodRepository,FoodRepository>();
            return services;
        }
    }
}