import { useEffect, useState } from "react";
import { getFoods } from "../api/foodService";
import type IFoodItem from "../Interfaces/Home/IFoodItem";
import { FoodCard } from "../components/Cards/FoodCard";
import Header from "../components/Header/Header";


function Home() {
    const [foods, setFoods] = useState<IFoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
        try {
            let data = await getFoods();
            data = data.map((item: IFoodItem) => {
                const consumedDate = new Date(item.lastConsumed);
                const nextDate = new Date(consumedDate);
                nextDate.setDate(consumedDate.getDate() + item.cooldownDays);
                return {
                    ...item,
                    lastConsumed: consumedDate,
                    nextConsumptionDate: nextDate 
                };
            });
            
            setFoods(data);
        } catch (error) {
            alert("Ocorreu um erro ao carregar os dados." + error);
        } finally {
            setLoading(false);
        }
        };

        fetchFoods();
    }, []); // O array vazio garante que rode apenas uma vez ao montar o componente

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col bg-[#242424] text-white justify-center items-center min-w-screen">
            <Header text="FoodCooldown" />
            <ul className="flex flex-col gap-6 justify-center w-4xl">
                {foods.map((food: IFoodItem, index) => (
                    <FoodCard key={index} food={food} />
                ))}
            </ul>
        </div>
    );
}
export default Home;