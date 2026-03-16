import { X } from "lucide-react";
import type { JSX, MouseEvent } from "react";

interface ButtonProps {
    onClose: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function CloseButton({
  onClose,
}: ButtonProps): JSX.Element {
  return (
    <button onClick={onClose} className="text-gray-400 hover:text-red-500">
        <X size={24} />
    </button>
  );
}