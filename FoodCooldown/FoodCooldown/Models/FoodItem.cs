// Models/FoodItem.cs
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FoodCooldown.Models
{
    public class FoodItem
    {
        [BsonId]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("imagePath")]
        public string ImagePath { get; set; } // Caminho da imagem
        [BsonElement("lastConsumed")]
        public DateTime LastConsumed { get; set; } // Data do último consumo
        [BsonElement("cooldownDays")]
        public int CooldownDays { get; set; } // Dias de espera até poder consumir novamente
    }
}