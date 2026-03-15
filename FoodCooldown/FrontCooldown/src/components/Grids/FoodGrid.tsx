import type { JSX } from "react";
import { FoodCard } from "../Cards/FoodCard";
import type IFoodItem from "../../Interfaces/Home/IFoodItem";

interface IFoodGridProps {
    foods: IFoodItem[];
    onActionSuccess: () => void; // Callback para atualizar a lista após ações como consumir
    className?: string;
}

export default function FoodGrid({
    foods,
    onActionSuccess,
}: IFoodGridProps): JSX.Element {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center w-full">
            {foods.map((food: IFoodItem, index) => (
                <FoodCard key={index} food={food} onConsumed={onActionSuccess} />
            ))}
        </ul>
    );
}