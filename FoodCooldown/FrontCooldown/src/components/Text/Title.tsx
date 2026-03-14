import type { JSX } from "react";

interface ITitleProps {
    className?: string;
    classNameText?: string;
    children?: React.ReactNode;
}

export default function Title({
    className = 'pl-4 pr-4 pt-4 w-full flex justify-center',
    classNameText = 'text-xl font-bold text-white',
    children = '',
}: ITitleProps): JSX.Element {
    return (
        <header className={`${className}`}>
            <h1 className={`${classNameText}`}>{children}</h1>
        </header>
    );
}