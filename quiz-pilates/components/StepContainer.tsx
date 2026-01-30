'use client';

import { ReactNode } from 'react';

interface StepContainerProps {
    children: ReactNode;
}

export default function StepContainer({ children }: StepContainerProps) {
    return (
        <div className="w-full max-w-[450px] mx-auto px-5 py-10 animate-fadeIn">
            {children}
        </div>
    );
}
