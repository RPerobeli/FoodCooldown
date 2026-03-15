import type { JSX } from "react";
import type IFoodItem from "../../Interfaces/Home/IFoodItem";
import SimpleButton from "../Buttons/SimpleButton";
import SubtitleText from "../Text/Text";

interface IFoodCardProps {
    food: IFoodItem;
    onConsumed: () => void; // Callback para notificar o componente pai que a ação de consumir foi realizada
}

import { 
  Clock, 
  ChevronRight} from 'lucide-react';
import { 
  MdLocalPizza, 
  MdIcecream, 
  MdCake, 
  MdCoffee,
  MdRestaurant} from 'react-icons/md';
import { 
  FaBurger, 
  FaHotdog, 
  FaAppleWhole,
  FaFish
} from 'react-icons/fa6';
import { GiDonut, GiNoodles, GiSushis, GiTacos, GiBarbecue } from 'react-icons/gi';
import StatusCard from "./StatusCard";
import { consumeFood } from "../../api/foodService";

const ConsumirFood = async (food: IFoodItem, onConsumed: () => void): Promise<void> => {
    const confirmacao = window.confirm(`Deseja consumir ${food.name} agora?`);
    if (confirmacao) {
        try {
            await consumeFood(food.id);
            alert(`${food.name} consumido com sucesso!`);
            // Aqui você pode adicionar lógica para atualizar o estado do componente pai, se necessário
            onConsumed(); // Notifica o componente pai que a ação foi realizada
        } catch (error) {
            alert(`Ocorreu um erro ao consumir ${food.name}. Tente novamente.`);
        }
    }
}

function calcularDiasFaltantes(dataFutura: Date, dataReferencia: Date = new Date()) {
    // Garantimos que trabalhamos com objetos Date
    const d1 = new Date(dataFutura);
    const d2 = new Date(dataReferencia);

    // Zeramos as horas para comparar apenas o calendário (dias inteiros)
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    // Diferença em milissegundos
    const diferencaMs = d1.getTime() - d2.getTime();;

    // Conversão de ms para dias: (1000ms * 60s * 60m * 24h)
    const diasFaltantes = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    return diasFaltantes > 0 ? diasFaltantes : 0;
}

function getFoodIcon(foodName: string): JSX.Element {
    const name = foodName.toLowerCase();
    const className = "text-4xl p-2 text-indigo-600";
    // Mapeamento de palavras-chave para ícones
    if (name.includes("pizza")) return <MdLocalPizza className = {className} />;
    if (name.includes("sorvete") || name.includes("ice cream")) return <MdIcecream className = {className} />;
    if (name.includes("hamburguer") || name.includes("burger")) return <FaBurger className = {className} />;
    if (name.includes("café") || name.includes("coffee")) return <MdCoffee className = {className} />;
    if (name.includes("bolo") || name.includes("cake")) return <MdCake className = {className} />;
    if (name.includes("donut")) return <GiDonut className = {className} />;
    if (name.includes("sushi")) return <GiSushis className = {className} />;
    if (name.includes("taco")) return <GiTacos className = {className} />;
    if (name.includes("massa") || name.includes("noodles")) return <GiNoodles className = {className} />;
    if (name.includes("peixe") || name.includes("fish")) return <FaFish className = {className} />;
    if (name.includes("maçã") || name.includes("apple")) return <FaAppleWhole className = {className} />;
    if (name.includes("cachorro") || name.includes("hotdog")) return <FaHotdog className = {className} />;
    if (name.includes("churrasco") || name.includes("barbecue")) return <GiBarbecue className = {className} />;
    // Ícone padrão caso não encontre correspondência
    return <MdRestaurant className = {className} />;
}


export function FoodCard({ food , onConsumed}: IFoodCardProps): JSX.Element {
    const isAvailable = calcularDiasFaltantes(food.nextConsumptionDate) <= 0;
    return (
        <div className="py-5 bg-[#2c2c2c] p-0.5 rounded-xl shadow-lg border border-indigo-600 hover:shadow-indigo-600 transition duration-300 flex flex-col cursor-pointer">
            <div className="flex flex-col  w-full">
                <div className="flex justify-start p-2">
                    <div className = "bg-indigo-500/10 rounded-[10px]">
                        {getFoodIcon(food.name)}
                    </div>
                </div>
                <div className="justify-items-start">
                    <SubtitleText className="px-2 text-xl text-white text-center font-bold ">
                        {food.name}
                    </SubtitleText>
                </div>
                {calcularDiasFaltantes(food.nextConsumptionDate) > 0 ? 
                <div className="flex flex-row items-center">
                    <Clock className="text-[12px] text-gray-600 pl-2" />
                    <SubtitleText className="px-2 text-[12px] text-gray-500 text-center ">
                        Cooldown: {calcularDiasFaltantes(food.nextConsumptionDate)} dia(s) restante(s).
                    </SubtitleText>
                </div> : <></>}
                <StatusCard isAvailable={isAvailable} />
                
                <div className="flex justify-center mt-2 px-2">
                    <SimpleButton onClick={() => ConsumirFood(food, onConsumed)} color="#4f46e5" enabled = {isAvailable} className= 'w-full'>
                        <div className = 'flex flex-row'>
                            <p>Consumir Agora</p>
                            <ChevronRight className="ml-1" />
                        </div>
                    </SimpleButton>
                </div>
            </div>
        </div>

    );

}