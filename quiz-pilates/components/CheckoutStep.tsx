import { useState } from 'react';
import { BiometricData } from '@/types/quiz';
import Image from 'next/image';

interface CheckoutStepProps {
    biometric: BiometricData;
    onContinue: () => void;
}

export default function CheckoutStep({ biometric, onContinue }: CheckoutStepProps) {
    const [selectedPlan, setSelectedPlan] = useState<'1-week' | '4-week' | '12-week'>('4-week');

    const toggleFaq = (index: number) => {
        const element = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        if (element && icon) {
            element.classList.toggle('hidden');
            icon.style.transform = element.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white pb-10">
            {/* Header: Before / After */}
            <div className="text-center mb-8">
                <div className="flex justify-center items-end gap-2 mb-4 px-4">
                    {/* Before - Fat Woman */}
                    <div className="flex-1 max-w-[140px]">
                        <div className="relative aspect-[3/4] mb-2">
                            <img
                                src="https://pilates.harnafit.com/_next/image?url=https%3A%2F%2Fs3.harna-app.com%2Fstatic_assets%2Fimages%2Ffinal%2Fbefore-after%2Fpilates-335sale-c%2Fbefore-heavier_side.png&w=256&q=75"
                                alt="Antes"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="font-bold text-gray-700">Agora</p>
                        <div className="bg-gray-100 rounded-lg p-2 font-bold text-gray-800 mt-1">
                            {biometric.currentWeight} {biometric.weightUnit}
                        </div>
                    </div>

                    {/* Animated Arrow */}
                    <div className="pb-16 text-[#d63384] text-4xl font-light opacity-50 animate-pulse flex flex-col justify-center">
                        <div className="rotate-90 md:rotate-0">»</div>
                    </div>

                    {/* After - Lean Woman */}
                    <div className="flex-1 max-w-[140px]">
                        <div className="relative aspect-[3/4] mb-2">
                            <img
                                src="https://pilates.harnafit.com/_next/image?url=https%3A%2F%2Fs3.harna-app.com%2Fquizes_images%2F8bbd6046-84ec-45b1-a70a-9659af17197b.png&w=256&q=75"
                                alt="Depois"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="font-bold text-gray-700">Seu objetivo</p>
                        <div className="bg-gray-100 rounded-lg p-2 font-bold text-gray-800 mt-1 border-2 border-[#d63384] text-[#d63384]">
                            {biometric.targetWeight} {biometric.weightUnit}
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 px-4 mb-6">
                    Seu plano de Pilates Asiático está pronto!
                </h2>

                {/* Pricing Cards */}
                <div className="px-4 space-y-4 mb-8">
                    {/* Single Offer Card */}
                    <div className="border-2 border-[#d63384] bg-[#fff9fb] rounded-2xl p-6 relative shadow-lg scale-[1.02]">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#d63384] text-white px-4 py-1 rounded-full text-sm font-semibold">
                            OFERTA EXCLUSIVA
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-xl mb-4 text-gray-800">Plano Completo</h3>
                            <div className="mb-4">
                                <span className="text-red-500 line-through text-lg block mb-1">R$ 87,90</span>
                                <span className="text-3xl font-bold text-[#d63384] block mb-1">R$ 19,90</span>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide bg-gray-100 px-3 py-1 rounded-full">Pagamento único</span>
                            </div>
                            <p className="text-xs text-green-600 font-bold mb-0">✓ Acesso Imediato e Vitalício</p>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <button
                        onClick={onContinue}
                        className="w-full bg-[#a32a6f] text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#85225a] transition-colors mb-4 uppercase tracking-wide"
                    >
                        Ver o meu plano
                    </button>
                    <p className="text-xs text-gray-500 px-4">
                        Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                    </p>
                </div>
            </div>

            {/* What you get */}
            <div className="px-6 mb-12">
                <h3 className="text-center font-bold text-xl mb-6">O que você recebe</h3>
                <ul className="space-y-4">
                    {[
                        "Plano personalizado de Pilates Asiático de 28 dias",
                        "Exercícios focados em áreas sensíveis: barriga, coxas e braços",
                        "Vídeos de fácil acompanhamento, sem necessidade de equipamentos",
                        "Dicas diárias de nutrição e estilo de vida para acelerar os resultados"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="bg-[#d63384] rounded-full p-1 mt-0.5 min-w-[20px] h-[20px] flex items-center justify-center">
                                <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="text-sm text-gray-700 font-medium leading-tight">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* App Badge */}

            </div>

            {/* Testimonials */}
            <div className="px-4 mb-4 bg-gray-50 py-8 -mx-4">
                <h3 className="text-center font-bold text-xl mb-6">Confiado por pessoas como você</h3>
                <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x hide-scrollbar">
                    <div className="min-w-[260px] bg-white p-4 rounded-xl shadow-sm border border-gray-100 snap-center">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                                <img src="https://randomuser.me/api/portraits/women/52.jpg" alt="Maria" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-bold">Maria Clara</span>
                            <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
                        </div>
                        <p className="text-xs text-gray-600 italic">"Adoro esse aplicativo! 6 meses e perdi 12kg com o Pilates Asiático. Super recomendo!"</p>
                    </div>
                    <div className="min-w-[260px] bg-white p-4 rounded-xl shadow-sm border border-gray-100 snap-center">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                                <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="Roberta" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-bold">Roberta Miranda</span>
                            <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
                        </div>
                        <p className="text-xs text-gray-600 italic">"Treinos rápidos que cabem na minha rotina de mãe. Me sinto muito mais disposta."</p>
                    </div>
                    <div className="min-w-[260px] bg-white p-4 rounded-xl shadow-sm border border-gray-100 snap-center">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                                <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="Juliana" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-bold">Juliana Gomes</span>
                            <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
                        </div>
                        <p className="text-xs text-gray-600 italic">"Nunca pensei que conseguiria fazer em casa, mas os vídeos são ótimos!"</p>
                    </div>
                </div>
            </div>

            {/* Group Photo */}
            <div className="px-4 mb-12">
                <div className="relative rounded-2xl overflow-hidden shadow-sm">
                    <img
                        src="https://pilates.harnafit.com/_next/image?url=https%3A%2F%2Fs3.harna-app.com%2Fquizes_images%2F9943e0ad-295c-480e-8336-cf45779159a1.png&w=384&q=75"
                        alt="Resultado Real"
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white text-xs font-medium text-center">
                            Junte-se a milhares de mulheres que transformaram suas vidas com o Método Pilates Asiático
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="px-6 mb-12">
                <h3 className="text-center font-bold text-xl mb-6">Perguntas Frequentes</h3>
                <div className="space-y-3">
                    {[
                        { q: "O que é Pilates Asiático?", a: "É uma variação moderna do Pilates tradicional que foca em movimentos fluidos e repetições suaves para tonificar sem causar impacto nas articulações, ideal para emagrecimento." },
                        { q: "Preciso de equipamentos?", a: "Não! Todo o nosso programa é desenhado para ser feito apenas com o peso do corpo, no conforto da sua casa." },
                        { q: "Como acesso meu plano?", a: "Assim que o pagamento for confirmado, você receberá acesso imediato ao nosso aplicativo e portal exclusivo por e-mail." }
                    ].map((faq, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleFaq(i)}
                                className="w-full flex items-center justify-between p-4 bg-white text-left font-semibold text-sm hover:bg-gray-50"
                            >
                                {faq.q}
                                <span id={`faq-icon-${i}`} className="transition-transform duration-300">▼</span>
                            </button>
                            <div id={`faq-answer-${i}`} className="hidden bg-gray-50 p-4 text-xs text-gray-600 border-t border-gray-100">
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Guarantee */}
            <div className="text-center px-6">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                    <img
                        src="https://powerlight.com.br/wp-content/uploads/2018/12/selo-garantia.png"
                        alt="Garantia de 30 dias"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h3 className="font-bold text-lg mb-2">Garantia de Devolução de 100% do Dinheiro</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Temos tanta certeza que você vai amar os resultados que oferecemos uma garantia incondicional de 30 dias. Se não estiver satisfeita, devolvemos seu dinheiro.
                </p>
            </div>
        </div>
    );
}
