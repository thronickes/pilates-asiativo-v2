'use client';

import { useState } from 'react';
import { useQuiz } from '@/context/QuizContext';

export default function StepNavigator() {
    const { currentStep, goToStep } = useQuiz();
    const [isOpen, setIsOpen] = useState(false);

    const steps = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-all flex items-center gap-2"
            >
                <span className="text-sm font-medium">Etapa {currentStep}/30</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-xl w-64 max-h-96 overflow-y-auto">
                    <div className="p-2">
                        <div className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">
                            Navegação de Etapas
                        </div>
                        {steps.map((step) => (
                            <button
                                key={step}
                                onClick={() => {
                                    goToStep(step);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${currentStep === step
                                        ? 'bg-[#d63384] text-white font-medium'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {step}. {getStepTitle(step)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Overlay para fechar quando clicar fora */}
            {isOpen && (
                <div
                    className="fixed inset-0 -z-10"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

// Helper para mostrar títulos das etapas
function getStepTitle(step: number): string {
    const titles: Record<number, string> = {
        1: 'Idade',
        2: 'Introdução',
        3: 'Objetivo Principal',
        4: 'Objetivos Adicionais',
        5: 'Zonas Alvo',
        6: 'Info: Zonas',
        7: 'Tipo de Corpo',
        8: 'Corpo Ideal',
        9: 'Histórico Fitness',
        10: 'Experiência Pilates',
        11: 'Info: Benefícios',
        12: 'Sensibilidades',
        13: 'Nível de Conforto',
        14: 'Info: Adaptação',
        15: 'Consentimento',
        16: 'Dados Biométricos',
        17: 'Estilo de Vida',
        18: 'Resumo',
        19: 'Atividades',
        20: 'Info: Combinação',
        21: 'Hidratação',
        22: 'Preferências Alimentares',
        23: 'Hábitos',
        24: 'Eventos de Vida',
        25: 'Info: Suporte',
        26: 'Gráfico Projeção',
        27: 'Processing',
        28: 'E-mail',
        29: 'Nome',
        30: 'Checkout',
    };
    return titles[step] || `Etapa ${step}`;
}
