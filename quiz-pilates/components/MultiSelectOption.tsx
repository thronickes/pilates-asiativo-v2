'use client';

import Image from 'next/image';

interface MultiSelectOptionProps {
    label: string;
    isSelected: boolean;
    onToggle: () => void;
    image?: string;
    description?: string;
    icon?: string;
}

export default function MultiSelectOption({ label, isSelected, onToggle, image, description, icon }: MultiSelectOptionProps) {
    return (
        <button
            onClick={onToggle}
            className={`w-full flex items-center justify-between px-5 py-[18px] my-3 border rounded-xl text-left font-medium transition-all duration-200 ${isSelected
                ? 'border-[#d63384] bg-[#fff9fb] text-[#d63384]'
                : 'border-gray-200 bg-white text-[#444] hover:border-[#d63384] hover:bg-[#fff9fb]'
                }`}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <span className={`text-2xl mr-2 ${isSelected ? 'text-[#d63384]' : 'text-[#d63384]'}`}>{icon}</span>
                )}
                {image && (
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                            src={image}
                            alt={label}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
                <div>
                    <span className="text-[1.05rem] block">{label}</span>
                    {description && (
                        <span className="text-[0.85rem] text-[#666] font-normal block mt-1">{description}</span>
                    )}
                </div>
            </div>
            <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${isSelected ? 'border-[#d63384] bg-[#d63384]' : 'border-gray-300'
                    }`}
            >
                {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
        </button>
    );
}
