import type { JSX } from "react";
import CooldownIcon from "../../assets/Icons/CooldownIcon";
import Title from "../Text/Title";
import SubtitleText from "../Text/Text";
import SimpleButton from "../Buttons/SimpleButton";
import { 
  Plus} from 'lucide-react';

export default function Header() : JSX.Element {
    return (
        <>
        <div className="flex flex-col w-full items-center justify-between mb-6">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row">
                    <CooldownIcon width = {100} height = {100} className="text-indigo-600" />
                    <div className = "flex flex-col">
                        <Title>FoodCooldown</Title>
                        <SubtitleText>
                            Gerencie o tempo entre seus prazeres
                        </SubtitleText>
                    </div>
                    
                </div>
                <SimpleButton 
                    onClick={() => alert("Button clicked!")}>
                    <div className = "flex flex-row items-center gap-2">
                        <Plus className="text-white" />
                        <p>Adicionar Alimento</p>
                    </div>
                </SimpleButton>
            </div>
        </div>
        </>
        
    );
}