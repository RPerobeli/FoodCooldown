import type { JSX } from "react";
import CooldownIcon from "../../assets/Icons/CooldownIcon";

interface IHeaderProps {
    text: string;
}
export default function Header(props: IHeaderProps) : JSX.Element {
    return (
        <div className="flex flex-col w-full items-center justify-center shadow-indigo-600 shadow-lg mb-6">
            <div className="flex flex-row">
            <CooldownIcon width = {100} height = {100} className="text-indigo-600" />
            <header className="bg-[#242424] p-4 w-full flex justify-center">
                <h1 className="text-2xl font-bold text-white">{props.text}</h1>
            </header>
            </div>
        </div>
    );
}