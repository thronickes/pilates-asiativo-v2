'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuiz } from '@/context/QuizContext';
import { quizSteps } from '@/data/quiz-steps';
import StepContainer from './StepContainer';
import OptionButton from './OptionButton';
import MultiSelectOption from './MultiSelectOption';
import ContinueButton from './ContinueButton';
import { BiometricData } from '@/types/quiz';
import CheckoutStep from './CheckoutStep';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

export default function QuizRenderer() {
    const { trackEvent } = useFunnelTracking();
    const { currentStep, nextStep, saveAnswer, answers } = useQuiz();
    const step = quizSteps.find((s) => s.id === currentStep);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [biometric, setBiometric] = useState<BiometricData>({
        height: 0,
        heightUnit: 'cm',
        currentWeight: 0,
        targetWeight: 0,
        weightUnit: 'kg',
        age: 0,
    });
    const [percentage, setPercentage] = useState(0);

    const getAnswerLabel = (stepId: number) => {
        const answerId = answers[stepId];
        if (!answerId || typeof answerId !== 'string') return '';

        const step = quizSteps.find(s => s.id === stepId);
        const option = step?.options?.find(opt => opt.id === answerId);

        if (!option) return '';

        // Remover apenas emojis, preservando acentos portugueses
        const cleanLabel = option.label.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();

        console.log(`Debug Resumo - Passo ${stepId}:`, { answerId, rawLabel: option.label, cleanLabel });

        return cleanLabel || option.label;
    };

    useEffect(() => {
        if (step?.type === 'processing') {
            setPercentage(0);
            const duration = 5000;
            const intervalTime = 50;
            const steps = duration / intervalTime;
            const increment = 100 / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= 100) {
                    setPercentage(100);
                    clearInterval(timer);
                    setTimeout(() => {
                        nextStep();
                    }, 500);
                } else {
                    setPercentage(current);
                }
            }, intervalTime);

            return () => clearInterval(timer);
        }
    }, [step?.type, nextStep]);

    // Track step views
    useEffect(() => {
        if (step) {
            trackEvent(step.id, 'view');
        }
    }, [step?.id, trackEvent]);

    // Reset selected options when step changes
    useEffect(() => {
        setSelectedOptions([]);
        setEmail('');
        setName('');
    }, [currentStep]);

    if (!step) return null;

    const handleOptionClick = (optionId: string) => {
        saveAnswer(step.id, optionId);
        nextStep();
    };

    const handleBiometricContinue = () => {
        // Salva os dados biométricos parciais e avança
        saveAnswer(step.id, biometric);
        nextStep();
    };

    const handleMultiSelectToggle = (optionId: string) => {
        // Etapa 5: Lógica especial para "Melhorar o corpo inteiro"
        if (step.id === 5 && optionId === 'full-body') {
            setSelectedOptions((prev) => {
                if (prev.includes('full-body')) {
                    // Se estava marcado, desmarcar tudo
                    return [];
                } else {
                    // Se não estava marcado, marcar todos (exceto "none")
                    const allOptions = step.options?.map(opt => opt.id).filter(id => id !== 'none') || [];
                    return allOptions;
                }
            });
            return;
        }

        // Lógica para opção "Nenhum" (exclusiva)
        if (optionId === 'none') {
            setSelectedOptions((prev) => {
                if (prev.includes('none')) {
                    return [];
                } else {
                    return ['none'];
                }
            });
            return;
        }

        // Lógica padrão para outras opções
        setSelectedOptions((prev) => {
            // Se selecionar outra opção e "none" estiver marcado, remove "none"
            let currentSelection = prev.includes('none') ? [] : prev;

            const newSelection = currentSelection.includes(optionId)
                ? currentSelection.filter((id) => id !== optionId)
                : [...currentSelection, optionId];

            // Na etapa 5, se alguma zona específica foi desmarcada, desmarcar "full-body" também
            if (step.id === 5 && !newSelection.includes(optionId) && prev.includes('full-body')) {
                return newSelection.filter(id => id !== 'full-body');
            }

            return newSelection;
        });
    };

    const handleMultiSelectContinue = () => {
        saveAnswer(step.id, selectedOptions);
        nextStep();
    };

    const handleInfoContinue = () => {
        nextStep();
    };

    const handleEmailSubmit = () => {
        if (email.includes('@')) {
            saveAnswer(step.id, email);
            nextStep();
        } else {
            alert('Por favor, insira um e-mail válido.');
        }
    };

    const handleNameSubmit = () => {
        if (name.trim()) {
            saveAnswer(step.id, name);
            nextStep();
        } else {
            alert('Por favor, insira seu nome.');
        }
    };

    const handleBiometricSubmit = () => {
        saveAnswer(step.id, biometric);
        nextStep();
    };

    return (
        <StepContainer>
            {/* Logo (apenas na primeira etapa) */}
            {currentStep === 1 && (
                <div className="text-center mb-6">
                    <Image
                        src="https://s3.harna-app.com/static_assets/images/logos/pilates-dark-343434.png"
                        alt="Harna Pilates"
                        width={120}
                        height={40}
                        className="mx-auto"
                        priority
                    />
                </div>
            )}

            {/* Imagem da etapa */}
            {step.image && step.type !== 'summary' && step.id !== 23 && step.id !== 1 && (
                <div className="mb-6">
                    <Image
                        src={step.image}
                        alt={step.title || ''}
                        width={450}
                        height={300}
                        className="w-full h-auto rounded-2xl"
                        priority={currentStep <= 3}
                    />
                </div>
            )}

            {/* Título */}
            {step.title && step.id !== 1 && (
                <h2 className="text-[1.6rem] font-bold leading-tight text-[#1a1a1a] mb-6 text-center">
                    {step.title}
                </h2>
            )}

            {/* Subtítulo */}
            {step.subtitle && step.id !== 1 && (
                <p className="text-[1rem] text-[#666] mb-4 text-center">{step.subtitle}</p>
            )}

            {/* Descrição */}
            {step.description && (
                <p className="text-[1rem] text-[#666] mb-6 text-center">{step.description}</p>
            )}

            {/* Renderização baseada no tipo */}
            {step.id === 1 && (
                <div className="relative min-h-[450px]">
                    <h2 className="text-[1.6rem] font-bold leading-tight text-[#1a1a1a] mb-8 text-center px-2">
                        Programa de Pilates Asiático para <span className="text-[#d63384]">Mulheres na Menopausa</span> emagrecerem pelo menos 7 quilos na próxima semana
                    </h2>
                    <p className="text-sm text-[#444] mb-8 text-center uppercase tracking-widest font-bold">
                        De acordo com sua idade <span className="block text-xs font-normal mt-1 text-[#666]">TESTE DE 1 MINUTO</span>
                    </p>

                    <div className="relative">
                        {/* Options */}
                        <div className="relative z-20 space-y-3 max-w-[65%]">
                            {step.options?.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option.id)}
                                    className="w-full text-left bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-4 px-4 font-bold text-gray-700 shadow-sm hover:border-[#d63384] hover:bg-[#fff9fb] transition-all flex items-center justify-between group"
                                >
                                    <span className="text-lg">{option.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#d63384]">➜</span>
                                </button>
                            ))}
                        </div>

                        {/* Image */}
                        <div className="absolute -right-20 -top-4 w-[350px] h-[550px] z-10 pointer-events-none">
                            {step.image && (
                                <Image
                                    src={step.image}
                                    alt={step.title || ''}
                                    fill
                                    className="object-contain object-top"
                                    sizes="(max-width: 768px) 70vw, 40vw"
                                    priority
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {step.type === 'question' && step.options && step.id !== 1 && (
                <div>
                    {step.options.map((option) => (
                        <OptionButton
                            key={option.id}
                            label={option.label}
                            description={option.description}
                            image={option.image}
                            onClick={() => handleOptionClick(option.id)}
                        />
                    ))}
                </div>
            )}

            {step.type === 'multiselect' && step.options && (
                <div>
                    {step.hasSelectAll && (
                        <div className="flex items-center mb-4 px-1">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={selectedOptions.length === step.options.filter(o => o.id !== 'none').length}
                                        onChange={() => {
                                            const allOptionIds = step.options!.filter(o => o.id !== 'none').map(o => o.id);
                                            if (selectedOptions.length === allOptionIds.length) {
                                                setSelectedOptions([]);
                                            } else {
                                                setSelectedOptions(allOptionIds);
                                            }
                                        }}
                                    />
                                    <div className={`block w-14 h-8 rounded-full transition-colors ${selectedOptions.length === step.options.filter(o => o.id !== 'none').length ? 'bg-[#d63384]' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${selectedOptions.length === step.options.filter(o => o.id !== 'none').length ? 'transform translate-x-6' : ''}`}></div>
                                </div>
                                <span className="ml-3 text-gray-700 font-medium">Selecionar tudo</span>
                            </label>
                        </div>
                    )}
                    {step.options.map((option) => (
                        <MultiSelectOption
                            key={option.id}
                            label={option.label}
                            description={option.description}
                            image={option.image}
                            icon={option.icon}
                            isSelected={selectedOptions.includes(option.id)}
                            onToggle={() => handleMultiSelectToggle(option.id)}
                        />
                    ))}
                    <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm pt-4 pb-2 z-10 -mx-5 px-5 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] mt-4">
                        <ContinueButton
                            onClick={handleMultiSelectContinue}
                            disabled={selectedOptions.length === 0}
                        />
                    </div>
                </div>
            )}

            {step.type === 'biometric' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Altura ({biometric.heightUnit})
                        </label>
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => setBiometric({ ...biometric, heightUnit: 'cm' })}
                                className={`px-4 py-2 rounded-lg font-medium ${biometric.heightUnit === 'cm' ? 'bg-[#d63384] text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                cm
                            </button>
                            <button
                                onClick={() => setBiometric({ ...biometric, heightUnit: 'ft' })}
                                className={`px-4 py-2 rounded-lg font-medium ${biometric.heightUnit === 'ft' ? 'bg-[#d63384] text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                pés
                            </button>
                        </div>
                        <input
                            type="number"
                            value={biometric.height || ''}
                            onChange={(e) => setBiometric({ ...biometric, height: Number(e.target.value) })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                            placeholder="Digite sua altura"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Peso Atual ({biometric.weightUnit})
                        </label>
                        <input
                            type="number"
                            value={biometric.currentWeight || ''}
                            onChange={(e) => setBiometric({ ...biometric, currentWeight: Number(e.target.value) })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                            placeholder="Digite seu peso atual"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Peso Alvo ({biometric.weightUnit})
                        </label>
                        <input
                            type="number"
                            value={biometric.targetWeight || ''}
                            onChange={(e) => setBiometric({ ...biometric, targetWeight: Number(e.target.value) })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                            placeholder="Digite seu peso alvo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Idade
                        </label>
                        <input
                            type="number"
                            value={biometric.age || ''}
                            onChange={(e) => setBiometric({ ...biometric, age: Number(e.target.value) })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                            placeholder="Digite sua idade"
                        />
                    </div>

                    <ContinueButton
                        onClick={handleBiometricContinue}
                        disabled={!biometric.height || !biometric.currentWeight || !biometric.targetWeight || !biometric.age}
                    />
                </div>
            )}

            {step.type === 'height' && (
                <div className="space-y-6">
                    <input
                        type="number"
                        value={biometric.height || ''}
                        onChange={(e) => setBiometric({ ...biometric, height: Number(e.target.value), heightUnit: 'cm' })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                        placeholder="EX: 165 cm"
                    />

                    <div className="text-center text-4xl font-bold text-[#333] mt-4">
                        {biometric.height ? `${biometric.height} cm` : ''}
                    </div>

                    <ContinueButton
                        onClick={handleBiometricContinue}
                        disabled={!biometric.height}
                        text="Próximo passo"
                    />
                </div>
            )}

            {step.type === 'weight-current' && (
                <div className="space-y-6">
                    <input
                        type="number"
                        value={biometric.currentWeight || ''}
                        onChange={(e) => setBiometric({ ...biometric, currentWeight: Number(e.target.value), weightUnit: 'kg' })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                        placeholder="EX: 70 kg"
                    />

                    <div className="text-center text-4xl font-bold text-[#333] mt-4">
                        {biometric.currentWeight ? `${biometric.currentWeight} kg` : ''}
                    </div>

                    {biometric.currentWeight && biometric.height && (() => {
                        const heightInMeters = biometric.height / 100;
                        const bmi = biometric.currentWeight / (heightInMeters * heightInMeters);
                        const bmiRounded = bmi.toFixed(1);

                        let category = '';
                        let message = '';
                        let bmiAngle = 0;

                        if (bmi < 18.5) {
                            category = 'abaixo do peso';
                            message = 'Concentre-se na tonificação muscular e em uma dieta equilibrada. Mantenha-se positivo e tente manter seu consumo diário de calorias dentro da faixa recomendada.';
                            bmiAngle = (bmi / 18.5) * 45;
                        } else if (bmi < 25) {
                            category = 'normal';
                            message = 'Você está fazendo um ótimo trabalho mantendo seu peso na faixa normal. Usaremos seu índice para adaptar um plano pessoal às suas necessidades.';
                            bmiAngle = 45 + ((bmi - 18.5) / (25 - 18.5)) * 45;
                        } else if (bmi < 30) {
                            category = 'sobrepeso';
                            message = 'Mantenha-se positivo e concentre-se em uma dieta equilibrada e exercícios. Usaremos seu índice para personalizar seu plano pessoal de perda de peso eficaz.';
                            bmiAngle = 90 + ((bmi - 25) / (30 - 25)) * 45;
                        } else {
                            category = 'obesidade';
                            message = 'Mantenha-se positivo e concentre-se em uma dieta equilibrada e exercícios. Usaremos seu índice para personalizar seu plano pessoal de perda de peso eficaz.';
                            bmiAngle = 135 + Math.min(((bmi - 30) / 10) * 45, 45);
                        }

                        return (
                            <>
                                <div className="relative w-64 h-40 mx-auto mb-6">
                                    <svg viewBox="0 0 200 100" className="w-full h-full">
                                        <path d="M 20 90 A 80 80 0 0 1 65 20" fill="none" stroke="#87CEEB" strokeWidth="20" />
                                        <path d="M 65 20 A 80 80 0 0 1 135 20" fill="none" stroke="#90EE90" strokeWidth="20" />
                                        <path d="M 135 20 A 80 80 0 0 1 180 90" fill="none" stroke="#FFD700" strokeWidth="20" />
                                        <g transform={`rotate(${bmiAngle - 90} 100 90)`}>
                                            <line x1="100" y1="90" x2="100" y2="30" stroke="#333" strokeWidth="3" />
                                            <circle cx="100" cy="90" r="6" fill="#333" />
                                        </g>
                                    </svg>
                                    <div className="absolute -bottom-4 w-full text-center text-xs text-gray-600 flex justify-between px-2">
                                        <span>&lt; 18.5</span>
                                        <span>18.5-24.9</span>
                                        <span>25-29.9</span>
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-5 text-left">
                                    <div className="flex gap-3">
                                        <div className="text-2xl">📊</div>
                                        <div>
                                            <h3 className="font-bold text-[#333] text-lg mb-2">
                                                Seu IMC é {bmiRounded}, o que é considerado {category}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}

                    <ContinueButton
                        onClick={handleBiometricContinue}
                        disabled={!biometric.currentWeight}
                        text="Próximo passo"
                    />
                </div>
            )}

            {step.type === 'weight-target' && (
                <div className="space-y-6">
                    <input
                        type="number"
                        value={biometric.targetWeight || ''}
                        onChange={(e) => setBiometric({ ...biometric, targetWeight: Number(e.target.value), weightUnit: 'kg' })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                        placeholder="EX: 60 kg"
                    />

                    <div className="text-center text-4xl font-bold text-[#333] mt-4">
                        {biometric.targetWeight ? `${biometric.targetWeight} kg` : ''}
                    </div>

                    <ContinueButton
                        onClick={handleBiometricContinue}
                        disabled={!biometric.targetWeight}
                        text="Próximo passo"
                    />
                </div>
            )}

            {step.type === 'age' && (
                <div className="space-y-6">
                    <input
                        type="number"
                        value={biometric.age || ''}
                        onChange={(e) => setBiometric({ ...biometric, age: Number(e.target.value) })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                        placeholder="EX: 45"
                    />

                    <div className="text-center text-4xl font-bold text-[#333] mt-4">
                        {biometric.age ? `${biometric.age} anos` : ''}
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-5 text-left">
                        <div className="flex gap-3">
                            <div className="text-2xl">⚡</div>
                            <div>
                                <h3 className="font-bold text-[#333] text-lg mb-2">
                                    Perguntamos sua idade para personalizar seu plano
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    As pessoas mais velhas têm um percentual de gordura corporal mais alto do que as pessoas mais jovens com o mesmo IMC.
                                </p>
                            </div>
                        </div>
                    </div>

                    <ContinueButton
                        onClick={handleBiometricContinue}
                        disabled={!biometric.age}
                        text="Próximo passo"
                    />
                </div>
            )}
            {step.type === 'info' && (
                <>
                    {step.id === 23 ? (
                        <div className="text-center space-y-4">
                            {/* Selected Activities */}
                            {(() => {
                                const selectedIds = answers[22] as string[] || [];
                                const activitiesStep = quizSteps.find(s => s.id === 22);
                                const selectedLabels = selectedIds.map(id =>
                                    activitiesStep?.options?.find(opt => opt.id === id)?.label
                                ).filter(Boolean).join(', ');

                                return (
                                    <p className="font-bold text-[#d63384] text-lg">
                                        {selectedLabels}
                                    </p>
                                );
                            })()}

                            <p className="text-gray-600">
                                Eles a ajudarão gentilmente a se sentir mais leve, com mais mobilidade e mais em sintonia consigo mesma - em todos os estágios da menopausa.
                            </p>

                            {step.image && (
                                <div className="py-6">
                                    <img
                                        src={step.image}
                                        alt="Atividades"
                                        className="w-full max-w-sm mx-auto h-auto"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        step.citation && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6 text-left">
                                <p className="text-xs text-gray-600 whitespace-pre-line">{step.citation}</p>
                            </div>
                        )
                    )}
                    <ContinueButton onClick={handleInfoContinue} text={step.buttonText} />
                </>
            )}

            {step.type === 'consent' && (
                <ContinueButton onClick={handleInfoContinue} text={step.buttonText} />
            )}

            {step.type === 'summary' && (
                <div className="space-y-6">
                    {/* IMC Bar */}
                    {biometric.height && biometric.currentWeight && (() => {
                        const heightInMeters = biometric.height / 100;
                        const bmi = biometric.currentWeight / (heightInMeters * heightInMeters);
                        const bmiRounded = bmi.toFixed(1);

                        let bmiPosition = 0;
                        if (bmi < 18.5) {
                            bmiPosition = (bmi / 18.5) * 25;
                        } else if (bmi < 25) {
                            bmiPosition = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
                        } else if (bmi < 30) {
                            bmiPosition = 50 + ((bmi - 25) / (30 - 25)) * 25;
                        } else {
                            bmiPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
                        }

                        return (
                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-medium text-gray-600">Índice de Massa Corporal (IMC)</h3>
                                    <span className="text-sm font-bold">Normal: 21,5</span>
                                </div>
                                <div className="text-center mb-2">
                                    <span className="text-lg font-semibold">Você - {bmiRounded}</span>
                                </div>
                                <div className="relative h-3 mb-2">
                                    <div className="absolute inset-0 rounded-full overflow-hidden flex">
                                        <div className="bg-[#6B9BD1]" style={{ width: '25%' }}></div>
                                        <div className="bg-[#85D98A]" style={{ width: '25%' }}></div>
                                        <div className="bg-[#F4D06F]" style={{ width: '25%' }}></div>
                                        <div className="bg-[#E88E7D]" style={{ width: '25%' }}></div>
                                    </div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg"
                                        style={{ left: `${bmiPosition}%`, transform: 'translate(-50%, -50%)' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Abaixo do peso</span>
                                    <span>Normal</span>
                                    <span>Obeso</span>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Profile Summary Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Objetivo principal</p>
                                        <p className="font-bold text-[#d63384]">{getAnswerLabel(3) || 'Perder peso'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">📅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Estilo de vida</p>
                                        <p className="font-bold text-gray-800">{getAnswerLabel(20) || 'Caseiro'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">❤️</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tipo de corpo</p>
                                        <p className="font-bold text-gray-800">{getAnswerLabel(7) || 'Sólido e sutilmente arredondado'}</p>
                                    </div>
                                </div>
                            </div>

                            {step.image && (
                                <div className="w-48 flex-shrink-0">
                                    <img src={step.image} alt="Perfil" className="w-full h-auto object-contain" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Training Type Recommendation */}
                    <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <div className="text-3xl">💪</div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">
                                    O TIPO DE TREINO perfeito para você é <span className="font-bold text-[#d63384]">Pilates Suave</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Consideramos suas áreas sensíveis e seu nível de condicionamento físico
                                </p>
                            </div>
                        </div>
                    </div>

                    <ContinueButton onClick={handleInfoContinue} text={step.buttonText} />
                </div>
            )}

            {step.type === 'email' && (
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@exemplo.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#d63384] focus:outline-none text-[1rem] mb-4"
                    />
                    <ContinueButton onClick={handleEmailSubmit} text="Desbloquear Acesso" />
                </div>
            )}

            {step.type === 'name' && (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#d63384] focus:outline-none text-[1rem] mb-4"
                    />
                    <ContinueButton onClick={handleNameSubmit} text="Continuar" />
                </div>
            )}

            {step.type === 'chart' && (
                <div className="text-center">
                    <p className="text-gray-600 mb-2">De acordo com as informações que você forneceu, atingirá seu peso ideal de</p>
                    <p className="font-bold text-[#d63384] text-xl mb-8">
                        {biometric.targetWeight} {biometric.weightUnit} até {(() => {
                            const today = new Date();
                            const targetDate = new Date(today);
                            targetDate.setDate(today.getDate() + 45);
                            return targetDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
                        })()}
                    </p>

                    <div className="relative mb-2">
                        {/* SVG Chart */}
                        <svg viewBox="0 0 350 220" className="w-full h-auto overflow-visible">
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                                    <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
                                    <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
                                </linearGradient>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                                    <stop offset="50%" stopColor="#eab308" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Area fill */}
                            <path
                                d="M20,20 Q175,120 330,180 L330,220 L20,220 Z"
                                fill="url(#areaGradient)"
                            />

                            {/* Line */}
                            <path
                                d="M20,20 Q175,120 330,180"
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />

                            {/* Points */}
                            {/* Start Point (Red) */}
                            <circle cx="20" cy="20" r="8" fill="#ef4444" />
                            {/* Middle Point (Yellow) */}
                            <circle cx="175" cy="118" r="8" fill="#eab308" />
                            {/* End Point (Green) */}
                            <circle cx="330" cy="180" r="8" fill="#22c55e" />

                            {/* White Outline for points */}
                            <circle cx="20" cy="20" r="8" fill="none" stroke="white" strokeWidth="2" />
                            <circle cx="175" cy="118" r="8" fill="none" stroke="white" strokeWidth="2" />
                            {/* Shadow/Glow for end point */}
                            <circle cx="330" cy="180" r="16" fill="#22c55e" opacity="0.2" />
                            <circle cx="330" cy="180" r="8" fill="#22c55e" stroke="white" strokeWidth="2" />

                            {/* Checkmark icon inside end point */}
                            <foreignObject x="323" y="173" width="14" height="14">
                                <div className="text-white text-[10px] bg-transparent flex justify-center items-center h-full">✓</div>
                            </foreignObject>
                        </svg>

                        {/* Labels (absolute positioned) */}
                        {/* Start Label */}
                        <div className="absolute top-[-30px] left-[20px] -translate-x-1/2">
                            <div className="bg-white border text-gray-700 text-xs px-2 py-1 rounded-lg shadow-sm whitespace-nowrap">
                                {biometric.currentWeight} {biometric.weightUnit}
                            </div>
                        </div>

                        {/* Middle Label */}
                        <div className="absolute top-[70px] left-[50%] -translate-x-1/2">
                            <div className="bg-white border text-gray-700 text-xs px-2 py-1 rounded-lg shadow-sm whitespace-nowrap">
                                {Math.round((biometric.currentWeight + biometric.targetWeight) / 2)} {biometric.weightUnit}
                            </div>
                        </div>

                        {/* End Label */}
                        <div className="absolute top-[130px] right-[-10px] -translate-x-1/2">
                            <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-2 py-1 rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1 font-bold">
                                {biometric.targetWeight} {biometric.weightUnit} <span className="bg-green-500 text-white rounded-[2px] px-[2px] text-[8px]">✓</span>
                            </div>
                        </div>

                        {/* X Axis Labels */}
                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-2 relative -top-4">
                            <span className="w-10 text-center">{(() => {
                                const d = new Date();
                                return d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                            })()}</span>
                            <span className="w-10 text-center">{(() => {
                                const d = new Date();
                                d.setDate(d.getDate() + 22);
                                return d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                            })()}</span>
                            <span className="w-10 text-center">{(() => {
                                const d = new Date();
                                d.setDate(d.getDate() + 45);
                                return d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                            })()}</span>
                        </div>

                        {/* Vertical Dashed Lines (CSS) */}
                        <div className="absolute top-[20px] left-[20px] w-[1px] h-[200px] border-l border-dashed border-gray-300 -z-10"></div>
                        <div className="absolute top-[118px] left-[175px] w-[1px] h-[102px] border-l border-dashed border-gray-300 -z-10"></div>
                        <div className="absolute top-[180px] left-[330px] w-[1px] h-[40px] border-l border-dashed border-gray-300 -z-10"></div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-0 mb-8">Os resultados variam de acordo com o uso e a adesão individual.</p>

                    <ContinueButton onClick={handleInfoContinue} text={step.buttonText} />
                </div>
            )}

            {step.type === 'processing' && (
                <div className="text-center">
                    {/* Circle Progress */}
                    <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                        {/* SVG Circle */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="16"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="none"
                                stroke="#d63384" // Pink
                                strokeWidth="16"
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                                strokeLinecap="round"
                                className="transition-all duration-75 ease-linear"
                            />
                        </svg>
                        <span className="absolute text-4xl font-bold text-[#d63384]">{Math.round(percentage)}%</span>
                    </div>

                    <h2 className="text-xl font-bold mb-8">Criando seu plano personalizado...</h2>

                    {/* Testimonials Cards (Horizontal Scroll) */}
                    <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 snap-x hide-scrollbar">
                        {/* Card 1 */}
                        <div className="min-w-[280px] bg-white border border-gray-100 rounded-2xl p-4 shadow-sm snap-center flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2 w-full">
                                <span className="font-bold text-sm">Francesca00fit</span>
                                <div className="text-yellow-400 text-xs">★★★★★</div>
                                <span className="text-xs text-gray-400 ml-auto">18.01.25</span>
                            </div>
                            <p className="text-sm text-gray-600">adoro esse aplicativo. 6 meses de uso e resultados reais. As instruções são claras e fáceis de seguir.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="min-w-[280px] bg-white border border-gray-100 rounded-2xl p-4 shadow-sm snap-center flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2 w-full">
                                <span className="font-bold text-sm">body_fitBoom</span>
                                <div className="text-yellow-400 text-xs">★★★★★</div>
                                <span className="text-xs text-gray-400 ml-auto">02.01.25</span>
                            </div>
                            <p className="text-sm text-gray-600">Nunca gostei de exercícios estruturados, mas isso é mais fácil de fazer do que o esperado. Estou apenas começando, mas tenho boas vibrações</p>
                        </div>
                        {/* Card 3 */}
                        <div className="min-w-[280px] bg-white border border-gray-100 rounded-2xl p-4 shadow-sm snap-center flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2 w-full">
                                <span className="font-bold text-sm">AmandaaaFit</span>
                                <div className="text-yellow-400 text-xs">★★★★★</div>
                                <span className="text-xs text-gray-400 ml-auto">30.01.25</span>
                            </div>
                            <p className="text-sm text-gray-600">Como mãe de dois filhos, era impossível encontrar tempo para fazer exercícios físicos - até o Harnafit. Seus treinos rápidos e eficazes se encaixam perfeitamente no meu dia. Mesmo que eu tenha apenas 15 minutos, posso fazer uma sessão e me sentir realizada.</p>
                        </div>
                    </div>
                </div>
            )}

            {step.type === 'result-chart' && (
                <div className="text-center px-4">
                    <p className="text-2xl font-bold text-gray-800 mb-8 max-w-xs mx-auto">
                        <span className="capitalize">{(answers[31] as string) || name || 'Amiga'}</span>,<br />
                        Seu Plano de Pilates Asiático está pronto!
                    </p>

                    <div className="relative mb-8 h-64">
                        {/* SVG Graph */}
                        <svg viewBox="0 0 320 220" className="w-full h-full overflow-visible">
                            {/* Grid Lines */}
                            <line x1="0" y1="40" x2="320" y2="40" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="0" y1="80" x2="320" y2="80" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="0" y1="120" x2="320" y2="120" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="0" y1="160" x2="320" y2="160" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="0" y1="200" x2="320" y2="200" stroke="#f3f4f6" strokeWidth="2" />

                            <line x1="40" y1="0" x2="40" y2="220" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="100" y1="0" x2="100" y2="220" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="160" y1="0" x2="160" y2="220" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="220" y1="0" x2="220" y2="220" stroke="#f3f4f6" strokeWidth="2" />
                            <line x1="280" y1="0" x2="280" y2="220" stroke="#f3f4f6" strokeWidth="2" />

                            <defs>
                                <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#d63384" />
                                    <stop offset="50%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#22c55e" />
                                </linearGradient>
                            </defs>

                            {/* Curve */}
                            <path
                                d="M40,40 C100,40 120,130 200,140 S 260,190 290,190"
                                fill="none"
                                stroke="url(#resultGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />

                            {/* Start Point */}
                            <circle cx="40" cy="40" r="8" fill="#d63384" />
                            <circle cx="40" cy="40" r="14" fill="#d63384" opacity="0.2" />

                            {/* End Point */}
                            <circle cx="290" cy="190" r="8" fill="#22c55e" />
                            <circle cx="290" cy="190" r="14" fill="#22c55e" opacity="0.2" />

                        </svg>

                        {/* Labels */}
                        <div className="absolute top-[20px] left-[40px] translate-x-4 -translate-y-1/2">
                            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap">
                                Agora: {biometric.currentWeight} {biometric.weightUnit}
                            </div>
                        </div>

                        <div className="absolute bottom-[20px] right-[10px] -translate-y-full -translate-x-0">
                            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl text-lg font-bold shadow-sm whitespace-nowrap">
                                {biometric.targetWeight} {biometric.weightUnit}
                            </div>
                        </div>
                    </div>

                    {/* X Axis Labels */}
                    <div className="flex justify-between text-xs text-gray-500 font-medium px-4 -mt-2 mb-8">
                        <span>Hoje</span>
                        <span>com Pilates Asiático</span>
                    </div>

                    <p className="text-xs text-gray-400 mb-8 max-w-xs mx-auto">Os resultados variam de acordo com o uso e a adesão individual.</p>

                    <ContinueButton onClick={handleInfoContinue} text={step.buttonText} />
                </div>
            )}

            {step.type === 'checkout' && (
                <CheckoutStep
                    biometric={biometric}
                    onContinue={() => window.location.href = 'https://pagamento-seguro.lifehealth.living/checkout/v4/TBjB3xn07YzBVppAfO0u'}
                />
            )}
        </StepContainer>
    );
}
