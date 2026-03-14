import type { JSX } from "react";
import Title from "../Text/Title";
import SubtitleText from "../Text/Text";
import type React from "react";

interface IResumeeCardProps {
    count?: number;
    title?: string;
    iconType?: string;
}

import {  
  CheckCircle2, 
  Clock} from 'lucide-react';
import { 
  MdRestaurant} from 'react-icons/md';

function getIcon(iconType: string): React.ReactNode {
    switch (iconType) {
        case "food":
            return <MdRestaurant className="text-4xl text-gray-400" />;
        case "clock":
            return <Clock className="text-5xl text-gray-400" />;
        case "check":
            return <CheckCircle2 className=" text-5xl text-gray-400" />;
        default:
            return null;
    }
}

export function ResumeeCard({ count = 0, title ="", iconType="food" }: IResumeeCardProps) : JSX.Element {
    return (
        <div className = "bg-[#2c2c2c] items-center flex flex-row p-3 justify-between border border-gray-600 hover:brightness-110  rounded-2xl">
            <div className = 'flex flex-col '>
                <SubtitleText className='text-gray-400'>{title}</SubtitleText>
                <Title className = 'w-full flex'>{count}</Title>
            </div>
            <div className="flex w-12 h-12 items-center justify-center border border-gray-400 rounded-2xl">
                {getIcon(iconType)}
            </div>
        </div>
    );
}
