import { type JSX } from 'react';

// Definimos os parâmetros opcionais (width e height padrão são 24x24)
interface CooldownIconProps {
  width?: number | string;
  height?: number | string;
  className?: string; // Para passar classes do Tailwind (como a cor)
}

export default function CooldownIcon (props: CooldownIconProps): JSX.Element { 
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.width || 72}
    height={props.height || 72}
    className={props.className}
    >
    {/* 1. Círculo Central (Fundo do Relógio) */}
    <circle cx="12" cy="12" r="7" fill="currentColor" />

    {/* 2. Ponteiros (Brancos sobre o fundo escuro) */}
    <line x1="12" y1="12" x2="12" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="12" x2="14.5" y2="14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

    {/* 3. O Arco Externo 
        Começa embaixo à esquerda (5.8, 18.5) e vai até o topo à esquerda (9, 3.5).
        A flag '1 0' garante que ele dê a volta longa por baixo e pela direita.
    */}
    <path
        d="M 5.8 18.5 A 9 9 0 1 0 9 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
    />

    {/* 4. A Seta Preenchida (no final do arco) 
        Usamos um polygon para criar uma ponta de seta sólida, como na imagem 1.
    */}
    <polygon
        points="4.5,4 11,0.5 9.5,7.5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
    />

    {/* 5. Os Pontos de Rastro 
        Posicionados cirurgicamente na órbita do lado esquerdo.
        Tamanhos decrescentes para dar o efeito de "sumiço".
    */}
    <circle cx="4.2" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="3" cy="12" r="1.2" fill="currentColor" />
    <circle cx="4.2" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
};