import type { JSX, ReactNode } from "react";

interface ButtonProps {
  className ?: string;
  color?: string;
  onClick: () => void;
  children: ReactNode; // Necessário para passar o texto do botão
}

export default function SimpleButton({
  className = '',
  color = "#4f46e5", // Cor padrão (um tom de indigo/roxo)
  onClick,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      // Usamos o atributo 'style' para valores dinâmicos passados via props
      style={{  
        backgroundColor: color 
      }}
      // Usamos o Tailwind para os comportamentos base (hover, clique, bordas)
      className={`${className} text-white font-semibold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center px-4 py-2`}
    >
      {children}
    </button>
  );
}