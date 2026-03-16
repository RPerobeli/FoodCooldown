import { useState, type JSX } from "react";
import CooldownIcon from "../../assets/Icons/CooldownIcon";
import Title from "../Text/Title";
import SubtitleText from "../Text/Text";
import SimpleButton from "../Buttons/SimpleButton";
import { 
  Plus} from 'lucide-react';
import AddFoodModal from "../Modals/AddFoodModal";




export default function Header() : JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
        <div className="flex flex-col w-full mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
                <div className="flex flex-row items-center gap-2">
                    <CooldownIcon width = {100} height = {100} className="text-indigo-600" />
                    <div className = "flex flex-col">
                        <Title>FoodCooldown</Title>
                        <SubtitleText>
                            Gerencie o tempo entre seus prazeres
                        </SubtitleText>
                    </div>
                    
                </div>
                <div className = 'w-full md:w-auto'>
                    <SimpleButton 
                        className="w-full md:w-auto"
                        onClick={ () => setIsModalOpen(true)}>
                        <div className = "flex flex-row items-center justify-center gap-2 py-1">
                            <Plus className="text-white" />
                            <p>Adicionar Alimento</p>
                        </div>
                    </SimpleButton>
                </div>
            </div>
        </div>
        {/* Chamada do Modal */}
        <AddFoodModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
                // Aqui você pode disparar o refresh da página ou hook
                window.location.reload(); 
            }}
        />
        </>
        
    );
}