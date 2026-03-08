export default interface IFoodItem {
    id: string;
    name: string;
    imagePath: string; // URL da imagem do alimento
    lastConsumed: Date;
    cooldownDays: number; // Tempo de cooldown em dias
    nextConsumptionDate: Date; // Data do próximo consumo permitido
}