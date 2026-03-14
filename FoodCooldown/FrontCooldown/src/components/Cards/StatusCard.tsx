import { CheckCircle2 } from "lucide-react";
import type { JSX } from "react";
import SubtitleText from "../Text/Text";

export default function StatusCard() : JSX.Element {
    return (
        <div className=' mx-2 bg-indigo-500/10 rounded-[10px] flex flex-row items-center justify-start border border-indigo-600 p-2 mt-4'>
            <CheckCircle2 className="text-emerald-500 p-1" />
            <div>
                <SubtitleText className=" text-[8px] text-gray-400 text-start ">STATUS</SubtitleText>
                <SubtitleText className=" text-[10px] text-emerald-500 text-start ">Disponível agora!</SubtitleText>
            </div>
        </div>
    );
}