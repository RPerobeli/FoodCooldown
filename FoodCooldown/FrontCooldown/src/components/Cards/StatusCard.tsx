import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { JSX } from "react";
import SubtitleText from "../Text/Text";


interface IStatusCardProps {
    isAvailable: boolean;
}

export default function StatusCard({ isAvailable }: IStatusCardProps) : JSX.Element {
    return (
        <div className=' bg-indigo-500/10 rounded-[10px] flex flex-row items-center justify-start border border-indigo-600 p-2'>
            {isAvailable ? (
                <CheckCircle2 className="text-emerald-500 p-1" />
            ) : (
                <AlertCircle className="text-red-500 p-1" />
            )}
            <div>
                <SubtitleText className=" text-[8px] text-gray-400 text-start ">STATUS</SubtitleText>
                <SubtitleText className={`text-[10px] ${isAvailable ? 'text-emerald-500' : 'text-red-500'} text-start `}>
                    {isAvailable ? 'Disponível agora!' : 'Indisponível'}
                </SubtitleText>
            </div>
        </div>
    );
}