'use client';

import { useQuiz } from '@/context/QuizContext';

export default function ProgressBar() {
    const { getProgress } = useQuiz();
    const progress = getProgress();

    return (
        <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden mb-8">
            <div
                className="h-full bg-gradient-to-r from-[#d63384] to-[#ff4d94] transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
