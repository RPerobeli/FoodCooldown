// Services/FileStorageService.cs
using FoodCooldown.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace FoodCooldown.Services
{
    public class FileStorageService
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "foodData.txt");

        public FileStorageService()
        {
            // Garante que o diretório existe
            Directory.CreateDirectory(Path.GetDirectoryName(_filePath));
        }

        public List<FoodItem> LoadFoodItems()
        {
            var foodItems = new List<FoodItem>();

            if (File.Exists(_filePath))
            {
                var lines = File.ReadAllLines(_filePath);
                foreach (var line in lines)
                {
                    var parts = line.Split('|');
                    if (parts.Length == 5)
                    {
                        foodItems.Add(new FoodItem
                        {
                            Id = int.Parse(parts[0]),
                            Name = parts[1],
                            ImagePath = parts[2],
                            LastConsumed = DateTime.Parse(parts[3]),
                            CooldownDays = int.Parse(parts[4])
                        });
                    }
                }
            }

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
    }
}