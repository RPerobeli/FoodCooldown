import { useEffect, useState } from "react";
import { getFoods } from "../api/foodService";
import type IFoodItem from "../Interfaces/Home/IFoodItem";
import { FoodCard } from "../components/Cards/FoodCard";
import Header from "../components/Header/Header";
import { ResumeePanel } from "../components/Panels/ResumeePanel";
import FoodGrid from "../components/Grids/FoodGrid";


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
        <div className="flex flex-col bg-[#242424] text-white justify-center items-center md:min-w-screen px-30 py-10">
            <div className = 'w-200 md:w-full'>
                <Header text="FoodCooldown" />
                <ResumeePanel foodList={foods} />
                <FoodGrid foods={foods} />
            </div>
        </div>
    );
}
export default Home;