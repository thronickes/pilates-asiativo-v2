'use client';

interface ContinueButtonProps {
    onClick: () => void;
    text?: string;
    disabled?: boolean;
}

export default function ContinueButton({ onClick, text = 'Continuar', disabled = false }: ContinueButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full bg-[#d63384] text-white border-none px-[18px] py-[18px] rounded-[30px] font-semibold text-[1.1rem] mt-5 shadow-[0_4px_15px_rgba(214,51,132,0.3)] hover:bg-[#b82a6f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {text}
        </button>
    );
}
