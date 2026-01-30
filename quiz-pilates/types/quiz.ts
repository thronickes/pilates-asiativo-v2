export type StepType =
    | 'question'
    | 'multiselect'
    | 'info'
    | 'biometric'
    | 'height'
    | 'weight-current'
    | 'weight-target'
    | 'age'
    | 'consent'
    | 'email'
    | 'name'
    | 'summary'
    | 'chart'
    | 'processing'
    | 'checkout'
    | 'result-chart';

export interface QuizOption {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    image?: string;
}

export interface QuizStep {
    id: number;
    type: StepType;
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    options?: QuizOption[];
    buttonText?: string;
    citation?: string;
    hasSelectAll?: boolean;
}

export interface QuizAnswers {
    [stepId: number]: string | string[] | Record<string, any>;
}

export interface BiometricData {
    height: number;
    heightUnit: 'cm' | 'ft';
    currentWeight: number;
    targetWeight: number;
    weightUnit: 'kg' | 'lb';
    age: number;
}
