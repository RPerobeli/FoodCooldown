// Services/FileStorageService.cs
using FoodCooldown.Models;
using FoodCooldown.Repository;
using System;
using System.Collections.Generic;
using System.IO;

namespace FoodCooldown.Services
{
    public interface IFoodService
    {
        Task<List<FoodItem>> LoadFoodItems();
        void SaveFoodItems(List<FoodItem> foodItems);
        Task UpdateFoodItem(FoodItem foodItem);
        Task AddFoodItem(FoodItem foodItem);
        Task DeleteFoodItem(string id);
    }
    public class FoodService : IFoodService
    {
        private readonly IFoodRepository _foodRepository;
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "foodData.txt");

        public FoodService()
        {
            // Garante que o diretório existe
            Directory.CreateDirectory(Path.GetDirectoryName(_filePath));
        }

        public FoodService(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }

        public Task AddFoodItem(FoodItem foodItem)
        {
            _foodRepository.CreateAsync(foodItem);
            return Task.CompletedTask;
        }

        public async Task<List<FoodItem>> LoadFoodItems()
        {            
            var foodItems = await _foodRepository.GetAllAsync();
            Console.WriteLine($"Itens encontrados: {foodItems.Count}");
            // if (foodItems == null || foodItems.Count == 0)
            // {
            //     foodItems = new List<FoodItem>();
            //     if (File.Exists(_filePath))
            //     {
            //         var lines = File.ReadAllLines(_filePath);
            //         foreach (var line in lines)
            //         {
            //             var parts = line.Split('|');
            //             if (parts.Length == 5)
            //             {
            //                 foodItems.Add(new FoodItem
            //                 {
            //                     Id = parts[0],
            //                     Name = parts[1],
            //                     ImagePath = parts[2],
            //                     LastConsumed = DateTime.Parse(parts[3]),
            //                     CooldownDays = int.Parse(parts[4])
            //                 });
            //             }
            //         }
            //     }
            // }   

            return foodItems;
        }

        public void SaveFoodItems(List<FoodItem> foodItems)
        {
            var lines = new List<string>();
            foreach (var item in foodItems)
            {
                lines.Add($"{item.Id}|{item.Name}|{item.ImagePath}|{item.LastConsumed}|{item.CooldownDays}");
            }
            File.WriteAllLines(_filePath, lines);
            
            
        }

        public async Task UpdateFoodItem(FoodItem foodItem)
        {
            await _foodRepository.UpdateAsync(foodItem);
        }

        public async Task DeleteFoodItem(string id)
        {
            await _foodRepository.RemoveAsync(id);
        }
    }
}