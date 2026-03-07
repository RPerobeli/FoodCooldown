using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodCooldown.Models;
using MongoDB.Driver;
namespace FoodCooldown.Repository
{
    public interface IFoodRepository
    {
        Task<List<FoodItem>> GetAllAsync();
        Task<FoodItem?> GetByIdAsync(string id);
        Task CreateAsync(FoodItem newFood);
        Task UpdateAsync(string id, FoodItem updatedFood);
        Task RemoveAsync(string id);
    }
    public class FoodRepository : IFoodRepository
    {
        private readonly IMongoCollection<FoodItem> _foodCollection;

        public FoodRepository(IMongoDatabase database)
        {
            // Pega a coleção específica dentro do banco de dados
            _foodCollection = database.GetCollection<FoodItem>("Foods");
        }

        // Exemplo de método assíncrono
        public async Task<List<FoodItem>> GetAllAsync() =>
            await _foodCollection.Find(_ => true).ToListAsync();
        public async Task<FoodItem?> GetByIdAsync(string id) =>
            await _foodCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(FoodItem newFood) =>
            await _foodCollection.InsertOneAsync(newFood);

        public async Task UpdateAsync(string id, FoodItem updatedFood) =>
            await _foodCollection.ReplaceOneAsync(x => x.Id == id, updatedFood);

        public async Task RemoveAsync(string id) =>
            await _foodCollection.DeleteOneAsync(x => x.Id == id);
        }
}