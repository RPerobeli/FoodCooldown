import { useState, useEffect, useCallback } from "react";
import { getFoods } from "../api/foodService";
import type IFoodItem from "../Interfaces/Home/IFoodItem";

export function useFoods() {
    const [foods, setFoods] = useState<IFoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFoods = useCallback(async () => {
        try {
            const data = await getFoods();
            const formattedData = data.map((item: IFoodItem) => {
                const consumedDate = new Date(item.lastConsumed);
                const nextDate = new Date(consumedDate);
                nextDate.setDate(consumedDate.getDate() + item.cooldownDays);
                return {
                    ...item,
                    lastConsumed: consumedDate,
                    nextConsumptionDate: nextDate 
                };
            });
            setFoods(formattedData);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFoods();
    }, [fetchFoods]);

    return { foods, loading, refresh: fetchFoods };
}