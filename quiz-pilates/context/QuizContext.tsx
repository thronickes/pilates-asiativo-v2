'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizAnswers, BiometricData } from '@/types/quiz';

interface QuizContextType {
    currentStep: number;
    answers: QuizAnswers;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    saveAnswer: (stepId: number, answer: string | string[] | BiometricData) => void;
    resetQuiz: () => void;
    getProgress: () => number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState<QuizAnswers>({});

    const totalSteps = 33;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const saveAnswer = (stepId: number, answer: string | string[] | BiometricData) => {
        setAnswers((prev) => ({
            ...prev,
            [stepId]: answer,
        }));
    };

    const resetQuiz = () => {
        setCurrentStep(1);
        setAnswers({});
    };

    const getProgress = () => {
        return ((currentStep - 1) / totalSteps) * 100;
    };

    return (
        <QuizContext.Provider
            value={{
                currentStep,
                answers,
                nextStep,
                prevStep,
                goToStep,
                saveAnswer,
                resetQuiz,
                getProgress,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within QuizProvider');
    }
    return context;
}
