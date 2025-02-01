// Models/FoodItem.cs
using System;

namespace FoodCooldown.Models
{
    public class FoodItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; } // Caminho da imagem
        public DateTime LastConsumed { get; set; } // Data do último consumo
        public int CooldownDays { get; set; } // Dias de espera até poder consumir novamente
    }
}