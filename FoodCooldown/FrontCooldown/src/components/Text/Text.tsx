import type { JSX } from "react";

interface ITextProps {
    className?: string;
    children?: React.ReactNode;
}

export default function SubtitleText({
    className,
    children
}: ITextProps): JSX.Element {
    return (
        <p className={className ?? 'ml-4 text-gray-400'}>
            {children}
        </p>
    );
}