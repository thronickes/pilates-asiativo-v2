import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useFunnelTracking = () => {
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        // Recuperar ou criar session_id único
        let storedSession = localStorage.getItem('quiz_session_id');
        if (!storedSession) {
            // Fallback para navegadores antigos se necessário, mas randomUUID é bem suportado hoje
            storedSession = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem('quiz_session_id', storedSession);
        }
        setSessionId(storedSession);
    }, []);

    const trackEvent = async (stepId: string | number, action: string, payload: any = {}) => {
        if (!sessionId) return;

        try {
            // Capturar UTMs apenas se for o primeiro tracking ou se tiver na URL
            const searchParams = new URLSearchParams(window.location.search);
            const utms = {
                utm_source: searchParams.get('utm_source') || undefined,
                utm_medium: searchParams.get('utm_medium') || undefined,
                utm_campaign: searchParams.get('utm_campaign') || undefined,
                utm_content: searchParams.get('utm_content') || undefined,
                utm_term: searchParams.get('utm_term') || undefined,
            };

            // Remover valores undefined para não sobrescrever com null se já existir no banco
            Object.keys(utms).forEach(key => utms[key as keyof typeof utms] === undefined && delete utms[key as keyof typeof utms]);

            // Converter stepId para número se possível para a coluna de ordenação
            const stepNumber = typeof stepId === 'number' ? stepId : parseInt(String(stepId).replace(/\D/g, '')) || 0;

            // UPSERT: Cria se não existe, Atualiza se existe
            await supabase.from('quiz_sessions').upsert({
                session_id: sessionId,
                last_step: String(stepId),
                max_step_number: stepNumber,
                updated_at: new Date().toISOString(),
                ...utms // Só atualiza UTMs se eles vierem na URL
            }, { onConflict: 'session_id' }); // Usa session_id para identificar a linha

        } catch (error) {
            console.error('Erro ao atualizar sessão:', error);
        }
    };

    return { trackEvent, sessionId };
};
