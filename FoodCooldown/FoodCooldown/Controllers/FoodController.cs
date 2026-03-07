// Controllers/FoodController.cs
using FoodCooldown.Models;
using FoodCooldown.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FoodCooldown.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly FoodService _storageService;

        public FoodController(FoodService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFoodItems()
        {
            try
            {
                List<FoodItem> foodItems = await _storageService.LoadFoodItems();
                return Ok(foodItems);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno ao carregar os alimentos: {ex.Message}");
            }
        }

        [HttpPost("Consume/id/{id}")]
        public async Task<IActionResult> Consume(string id)
        {
            try
            {
                var foodItems = await _storageService.LoadFoodItems();
                var foodItem = foodItems.Find(f => f.Id == id);

                if (foodItem != null)
                {
                    foodItem.LastConsumed = DateTime.Now;
                    _storageService.SaveFoodItems(foodItems);
                }
                
                return Ok();
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno ao consumir o alimento: {ex.Message}");
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(FoodItem foodItem)
        {
            try
            {
                var foodItems = await _storageService.LoadFoodItems();
                foodItems.Add(foodItem);
                _storageService.SaveFoodItems(foodItems);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno ao adicionar o alimento: {ex.Message}");
            }
        }

        [HttpPut("Update/id/{id}")]
        public async Task<IActionResult> Update(string id, FoodItem foodItem)
        {
            try
            {
                var foodItems = await _storageService.LoadFoodItems();
                var existingItem = foodItems.Find(f => f.Id == id);

                if (existingItem != null)
                {
                    foodItems.Remove(existingItem);
                    foodItems.Add(foodItem);
                    _storageService.SaveFoodItems(foodItems);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno ao atualizar o alimento: {ex.Message}");
            }
        }
    }
}