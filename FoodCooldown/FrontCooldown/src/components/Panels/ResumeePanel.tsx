import type { JSX } from "react";
import { ResumeeCard } from "../Cards/ResumeeCard";
import type IFoodItem from "../../Interfaces/Home/IFoodItem";

interface IResumeePanelProps {
    foodList?: IFoodItem[];
}
export function ResumeePanel({foodList}:IResumeePanelProps) : JSX.Element {
    return (
        <div className = 'grid grid-cols-1 md:grid-cols-3 gap-4 justify-between mb-4'>
            <ResumeeCard count={foodList?.length || 0} title="TOTAL ALIMENTOS" iconType="food" />
            <ResumeeCard count={foodList?.filter(item => item.nextConsumptionDate < new Date()).length || 0} title="EM COOLDOWN" iconType="clock" />
            <ResumeeCard count={foodList?.filter(item => item.nextConsumptionDate >= new Date()).length || 0} title="DISPONÍVEIS" iconType="check" /> 
        </div>
    );
}
