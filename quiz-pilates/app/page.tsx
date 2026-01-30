'use client';

import ProgressBar from '@/components/ProgressBar';
import QuizRenderer from '@/components/QuizRenderer';
import StepNavigator from '@/components/StepNavigator';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* <StepNavigator /> */} {/* Desabilitado para produção */}
      <div className="w-full max-w-[450px] mx-auto px-5 pt-6">
        <ProgressBar />
      </div>
      <QuizRenderer />
    </main>
  );
}
