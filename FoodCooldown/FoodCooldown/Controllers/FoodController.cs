// Controllers/FoodController.cs
using FoodCooldown.Models;
using FoodCooldown.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FoodCooldown.Controllers
{
    public class FoodController : Controller
    {
        private readonly FileStorageService _storageService;

        public FoodController()
        {
            _storageService = new FileStorageService();
        }

        public IActionResult Index()
        {
            var foodItems = _storageService.LoadFoodItems();
            return View(foodItems);
        }

        [HttpPost]
        public IActionResult Consume(int id)
        {
            var foodItems = _storageService.LoadFoodItems();
            var foodItem = foodItems.Find(f => f.Id == id);

            if (foodItem != null)
            {
                foodItem.LastConsumed = DateTime.Now;
                _storageService.SaveFoodItems(foodItems);
            }

            return RedirectToAction("Index");
        }
    }
}