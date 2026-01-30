'use client';

import Image from 'next/image';

interface OptionButtonProps {
    label: string;
    description?: string;
    image?: string;
    onClick: () => void;
}

export default function OptionButton({ label, description, image, onClick }: OptionButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between px-5 py-[18px] my-3 border border-gray-200 rounded-xl text-left font-medium hover:border-[#d63384] hover:bg-[#fff9fb] hover:text-[#d63384] transition-all duration-200 bg-white text-[#444]"
        >
            <div className="flex items-center gap-3 flex-1">
                {image && (
                    <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                            src={image}
                            alt={label}
                            width={72}
                            height={72}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
                <div className="flex-1">
                    <div className="text-[1.05rem] font-semibold">{label}</div>
                    {description && (
                        <div className="text-xs text-gray-500 mt-1">{description}</div>
                    )}
                </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}
