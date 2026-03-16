import { useState, type JSX } from "react";
import { X } from "lucide-react";

import SimpleButton from "../Buttons/SimpleButton";
import type IFoodItem from "../../Interfaces/Home/IFoodItem";
import { addFood } from "../../api/foodService";

interface AddFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddFoodModal({ isOpen, onClose, onSuccess }: AddFoodModalProps): JSX.Element | null {
    const [name, setName] = useState("");
    const [cooldown, setCooldown] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!name) return alert("Por favor, insira o nome.");

        setLoading(true);
        const newFood: IFoodItem = {
            id: "",
            name: name,
            imagePath: "default-food.png",
            lastConsumed: new Date(2024,1,1),
            cooldownDays: cooldown,
            nextConsumptionDate: new Date() 
        };

        try {
            await addFood(newFood);
            onSuccess(); // Refresh na lista
            onClose();   // Fecha o modal
        } catch (error) {
            alert("Erro ao adicionar alimento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-[#1a1a1a] border border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Novo Alimento</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Nome do Alimento</label>
                        <input 
                            type="text"
                            value={name}
                            maxLength={40}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#242424] border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                            placeholder="Ex: Pizza"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Dias de Cooldown</label>
                        <input 
                            type="number"
                            value={cooldown}
                            onChange={(e) => setCooldown(Number(e.target.value))}
                            className="w-full bg-[#242424] border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="pt-4">
                        <SimpleButton 
                            onClick={handleSubmit} 
                            enabled={!loading}
                            className="w-full"
                        >
                            {loading ? "Salvando..." : "Confirmar Alimento"}
                        </SimpleButton>
                    </div>
                </div>
            </div>
        </div>
    );
}