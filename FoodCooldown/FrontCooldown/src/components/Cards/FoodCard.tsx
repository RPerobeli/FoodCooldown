import type { JSX } from "react";
import type IFoodItem from "../../Interfaces/Home/IFoodItem";
import SimpleButton from "../Buttons/SimpleButton";

interface IFoodCardProps {
    food: IFoodItem;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


function ConsumirFood(food: IFoodItem): void {
    alert(`Você consumiu ${food.name}!`);
    // Aqui você pode adicionar a lógica para atualizar o estado do alimento, como definir a data de consumo atual e calcular a próxima data de consumo.
}
export function FoodCard({ food }: IFoodCardProps): JSX.Element {

    return (
        <li className="bg-[#333333] p-0.5 rounded-xl shadow-lg border border-[#444444] hover:shadow-indigo-600 transition duration-300 flex flex-row items-center cursor-pointer w-full">
            <div className="grid grid-cols-4 items-center gap-15 w-full">
                <div className="flex justify-start">
                    <span className="text-4xl mb-3">🍽️</span>
                    {/* <span className="text-4xl mb-3">{food.imageUrl}</span> adicionar aqui quando houver imagens de comida */}           
                </div>
                <div className="justify-items-center">
                    <h2 className="text-xl font-semibold text-white text-center">
                        {food.name}
                    </h2>
                </div>
                <div className="justify-items-center">
                    <h2 className="text-xl font-semibold text-white text-center">
                        Prox: {formatDate(food.nextConsumptionDate)}
                    </h2>
                </div>
                <div className="flex justify-end mr-1.5">
                    <SimpleButton onClick={() => ConsumirFood(food)} width={120} height={40} color="#3949AB">
                        Consumir
                    </SimpleButton>
                </div>
            </div>
        </li>

    );

}