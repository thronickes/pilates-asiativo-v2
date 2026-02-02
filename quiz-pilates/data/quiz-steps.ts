import { QuizStep } from '@/types/quiz';

export const quizSteps: QuizStep[] = [
    // Etapa 1: Idade
    {
        id: 1,
        type: 'question',
        title: 'Programa de Pilates Asiático para Mulheres na Menopausa',
        subtitle: 'De acordo com sua idade. TESTE DE 1 MINUTO.',
        image: 'https://s3.harna-app.com/quizes_images/9a7f38c9-8e74-41fb-83e7-cc5711f5ef86.png',
        options: [
            { id: '39-45', label: '39-45' },
            { id: '46-50', label: '46-50' },
            { id: '51-60', label: '51-60' },
            { id: '60+', label: '60+' },
        ],
    },

    // Etapa 2: Introdução aos Exercícios
    {
        id: 2,
        type: 'info',
        title: 'Exercícios fáceis para perda de peso',
        description: 'O Pilates Asiático é uma abordagem única que combina movimentos suaves com técnicas de fortalecimento profundo. Ideal para mulheres na menopausa que buscam perda de peso, força e flexibilidade.',
        image: 'https://s3.harna-app.com/quizes_images/02fcf3c7-c150-4fd4-af1e-1c274a426e86.png',
        buttonText: 'Continuar',
    },

    // Etapa 3: Objetivo Principal
    {
        id: 3,
        type: 'question',
        title: 'Qual é o seu objetivo principal?',
        options: [
            { id: 'weight-loss', label: '🏋️ Perder peso' },
            { id: 'maintain', label: '💪 Manter o peso e ficar em forma' },
            { id: 'fitness', label: '🏃 Melhorar a aptidão física' },
        ],
    },

    // Etapa 4: Objetivos Adicionais
    {
        id: 4,
        type: 'multiselect',
        title: 'Escolha seus objetivos adicionais',
        options: [
            { id: 'energy', label: '⚡ Aumentar a energia' },
            { id: 'sleep', label: '🌙 Melhorar o sono' },
            { id: 'stress', label: '⚠️ Reduzir o estresse' },
            { id: 'posture', label: '🧘 Melhorar a postura e a mobilidade' },
            { id: 'flexibility', label: '🤸 Desenvolva flexibilidade' },
        ],
    },

    // Etapa 5: Zonas Alvo
    {
        id: 5,
        type: 'multiselect',
        title: 'Quais são as zonas que mais a preocupam?',
        subtitle: 'Por favor, selecione todas as opções aplicáveis',
        options: [
            { id: 'full-body', label: 'Melhorar o corpo inteiro' },
            {
                id: 'double-chin',
                label: 'Queixo duplo',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/double.png'
            },
            {
                id: 'arms',
                label: 'Braços flácidos',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/arms.png'
            },
            {
                id: 'chest',
                label: 'Seios caídos',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/breasts.png'
            },
            {
                id: 'belly',
                label: 'Gordura da barriga',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/belly.png'
            },
            {
                id: 'knees',
                label: 'Gordura nos joelhos',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/knees.png'
            },
            {
                id: 'saddlebags',
                label: 'Traseiro de alforje',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/saddlebags1.png'
            },
            {
                id: 'glutes',
                label: 'Nádegas flácidas',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/buttocks.png'
            },
            {
                id: 'inner-thigh',
                label: 'Parte interna da coxa',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/target-zones-square/legs.png'
            },
            { id: 'none', label: 'Nenhuma delas' },
        ],
    },

    // Etapa 6: Informativa (Zonas)
    {
        id: 6,
        type: 'info',
        title: 'Acompanhe todas as mudanças de seu corpo e mantenha-se jovem em qualquer idade',
        description: 'Durante a perimenopausa e a menopausa, as mulheres apresentam um aumento significativo na gordura corporal total e central devido a alterações hormonais, principalmente a diminuição dos níveis de estrogênio',
        citation: 'Biblioteca Nacional de Medicina\nPubMed Central',
        image: 'https://s3.harna-app.com/quizes_images/4ef7eddc-1a08-49bc-badc-da0dc635c38d.png',
        buttonText: 'Continuar',
    },

    // Etapa 7: Tipo de Corpo Atual
    {
        id: 7,
        type: 'question',
        title: 'Como você descreveria seu corpo agora?',
        options: [
            {
                id: 'slim',
                label: 'Magra',
                description: 'Desejo ganhar massa muscular',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/slim.jpg'
            },
            {
                id: 'skinny-fat',
                label: 'Gordura Magra',
                description: 'Magra, mas precisa tonificar e perder peso',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/mid_sized.jpg'
            },
            {
                id: 'curvy',
                label: 'Sólido e sutilmente arredondado',
                description: 'Forma firme e macia com proporções suaves',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/heavier_side.jpg'
            },
            {
                id: 'overweight',
                label: 'Sobrepeso',
                description: 'Procurando uma maneira rápida e saudável de perder peso',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/overweight.jpg'
            },
        ],
    },

    // Etapa 8: Corpo Desejado
    {
        id: 8,
        type: 'question',
        title: 'Qual é o corpo dos seus sonhos?',
        options: [
            {
                id: 'curvy',
                label: 'Curvilínea',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/curvy.jpg'
            },
            {
                id: 'slim',
                label: 'Magro',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/thin.jpg'
            },
            {
                id: 'fit',
                label: 'Em forma',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/toned.jpg'
            },
            {
                id: 'toned',
                label: 'Tonificado',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/bikini_body.jpg'
            },
            {
                id: 'happy',
                label: 'Estou bem com meu corpo',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/bodytype-pilates/heavier_side.jpg'
            },
        ],
    },

    // Etapa 9: Histórico de Atividade Física
    {
        id: 9,
        type: 'question',
        title: 'Há quanto tempo você estava na melhor forma da sua vida?',
        options: [
            { id: '1-2-years', label: '1 a 2 anos atrás' },
            { id: '3-5-years', label: '3 a 5 anos atrás' },
            { id: '5-plus', label: 'Mais de 5 anos atrás' },
            { id: 'never', label: 'Nunca' },
        ],
    },

    // Etapa 10: Experiência com Pilates
    {
        id: 10,
        type: 'question',
        title: 'Já teve alguma experiência anterior com Pilates?',
        options: [
            { id: 'sometimes', label: 'Sim, eu pratico às vezes' },
            { id: 'long-ago', label: 'Sim, mas há algum tempo' },
            { id: 'never', label: 'Não, não tenho experiência' },
        ],
    },

    // Etapa 11: Informativa (Pilates)
    {
        id: 11,
        type: 'info',
        title: 'Seu corpo conhece os benefícios - agora é hora de prosperar',
        description: 'Mostramos a você que em todas as faixas de física e idade, Nossos programas de Pilates Asiático são projetados para apoiar mulheres durante a menopausa com exercícios suaves e resultados que você poderá sentir',
        image: 'https://s3.harna-app.com/quizes_images/73ea3a01-9d58-47a6-b287-a34b427b83ec.png',
        buttonText: 'Continuar',
    },

    // Etapa 12: Problemas de Saúde / Sensibilidades
    {
        id: 12,
        type: 'multiselect',
        title: 'Você tem alguma dessas sensibilidades?',
        subtitle: 'Por favor, selecione todas as opções aplicáveis',
        options: [
            {
                id: 'back',
                label: 'Costas sensíveis',
                image: 'https://s3.harna-app.com/quizes_images/058e74d3-ed6c-4abc-a4f9-0eba9088f69f.png'
            },
            {
                id: 'knees',
                label: 'Joelhos sensíveis',
                image: 'https://s3.harna-app.com/quizes_images/d7a3b7ef-9402-42a5-a5ad-cf6029b48c39.png'
            },
            {
                id: 'hip-surgery',
                label: 'Cirurgia de quadril',
                image: 'https://s3.harna-app.com/quizes_images/4adae6bf-6f95-47ee-97ba-964daa35f2ea.png'
            },
            {
                id: 'shoulders',
                label: 'Ombros e braços',
                image: 'https://s3.harna-app.com/quizes_images/2a7bb913-2e7e-4151-a98d-a664920cf84f.png'
            },
            {
                id: 'calves',
                label: 'Panturrilhas e tornozelos',
                image: 'https://s3.harna-app.com/quizes_images/1a61141d-6e3e-4aeb-86e6-de68495d203c.png'
            },
            { id: 'none', label: 'Nenhuma das opções acima' },
        ],
    },

    // Etapa 13: Nível de Conforto
    {
        id: 13,
        type: 'question',
        title: 'Como você se sente ao realizar movimentos básicos?',
        options: [
            { id: 'pain', label: '😣 Sinto dor/Desconforto' },
            { id: 'difficulty', label: '😐 Sinto alguma dificuldade' },
            { id: 'comfortable', label: '😊 Sinto-me confortável' },
        ],
    },

    // Etapa 14: Informativa (Conforto)
    {
        id: 14,
        type: 'info',
        title: 'Adaptaremos os exercícios para você',
        description: 'Nosso programa será personalizado considerando suas limitações. Todos os exercícios terão versões modificadas para garantir sua segurança e conforto.',
        image: 'https://s3.harna-app.com/quizes_images/30fb76ad-8d81-42d9-80ec-dbcac671c8ee.png',
        buttonText: 'Continuar',
    },




    // Etapa 15: Altura
    {
        id: 15,
        type: 'height',
        title: 'Qual é a sua altura?',
        description: 'Selecione a unidade e insira sua altura',
    },

    // Etapa 16: Peso Atual
    {
        id: 16,
        type: 'weight-current',
        title: 'Qual é o seu peso atual?',
        description: 'Insira seu peso atual',
    },

    // Etapa 17: Peso Alvo
    {
        id: 17,
        type: 'weight-target',
        title: 'Qual é o seu peso alvo?',
        description: 'Insira o peso que deseja alcançar',
    },

    // Etapa 18: Idade
    {
        id: 18,
        type: 'age',
        title: 'Qual é a sua idade?',
        description: 'Insira sua idade',
    },

    // Etapa 19: Importância no Programa
    {
        id: 19,
        type: 'multiselect',
        title: 'O que é mais importante para você em um programa de Pilates?',
        subtitle: 'Pode escolher várias opções',
        options: [
            { id: 'gentle-exercises', label: 'Exercícios suaves e adaptados' },
            { id: 'professional-support', label: 'Suporte profissional' },
            { id: 'personalized-approach', label: 'Abordagem personalizada' },
            { id: 'health-benefits', label: 'Explicação dos benefícios de saúde' },
        ],
    },


    // Etapa 20: Estilo de Vida
    {
        id: 20,
        type: 'question',
        title: 'Como você descreveria seu dia típico?',
        options: [
            {
                id: 'calm',
                label: 'Caseiro',
                description: 'Principalmente em casa, desfrutando de um ritmo mais lento e calmo',
                image: 'https://s3.harna-app.com/quizes_images/92068a4c-76ea-4cc4-9b88-7e4d398834f4.png'
            },
            {
                id: 'family',
                label: 'Focado na família',
                description: 'Cuidando da família e permanecendo moderadamente ativo',
                image: 'https://s3.harna-app.com/quizes_images/138d10c5-cf1c-4d47-a450-48d2fd4c8fa4.png'
            },
            {
                id: 'active',
                label: 'Ativo e social',
                description: 'Caminhadas regulares e atividades sociais mantêm você em movimento',
                image: 'https://s3.harna-app.com/quizes_images/ccf845c4-06e3-4b71-bc42-2d09e63362e5.png'
            },
        ],
    },

    // Etapa 21: Resumo Informativo
    {
        id: 21,
        type: 'summary',
        title: 'Seu perfil está pronto',
        description: 'Com base nas suas respostas, criamos um resumo do seu perfil. O tipo de treino perfeito para você é Pilates Suave, considerando suas áreas sensíveis e seu nível de condicionamento físico.',
        image: 'https://s3.harna-app.com/static_assets/images/final/before-after/pilates-as/before-heavier_side.png',
        buttonText: 'Continuar',
    },

    // Etapa 22: Atividades Adicionais
    {
        id: 22,
        type: 'multiselect',
        title: 'O que você acrescentaria além do Pilates?',
        subtitle: 'Selecione pelo menos um',
        options: [
            {
                id: 'yoga',
                label: 'Ioga',
                description: 'Reduza o estresse e traga equilíbrio à sua vida',
                image: 'https://s3.harna-app.com/quizes_images/979db116-2f5b-4b71-81ab-02cd422116e4.png'
            },
            {
                id: 'barre',
                label: 'Barra',
                description: 'Afine seus músculos, mesmo os ocultos',
                image: 'https://s3.harna-app.com/quizes_images/57658365-f66e-4ece-91cb-d2a09f26dc4c.png'
            },
            {
                id: 'resistance',
                label: 'Resistência',
                description: 'Trabalhe esses músculos para ficar mais forte',
                image: 'https://s3.harna-app.com/quizes_images/1e3ad868-c6d2-401e-8fa2-abb789a57848.png'
            },
            {
                id: 'walking',
                label: 'Caminhada',
                description: 'Energize seu corpo, fortaleça cada passo',
                image: 'https://s3.harna-app.com/quizes_images/2d6677c2-211a-4849-ac27-09fbe8a0d683.png'
            },
        ],
    },

    // Etapa 23: Informativa (Atividades)
    {
        id: 23,
        type: 'info',
        title: 'Já estamos preparando seu plano personalizado',
        description: 'Adicionamos as atividades que você selecionou ao seu plano:',
        image: 'https://s3.harna-app.com/quizes_images/3bfcae38-e63b-48fd-96c2-1cd91e31bb2a.png',
        buttonText: 'Continuar',
    },

    // Etapa 24: Hidratação
    {
        id: 24,
        type: 'question',
        title: 'Quanta água você bebe diariamente?',
        options: [
            { id: 'coffee-tea', label: 'Eu só tomo café ou chá' },
            { id: '2-cups', label: 'Cerca de 2 copos (0,5 L)' },
            { id: '2-6-cups', label: '2 a 6 copos (0,5-1,5 L)' },
            { id: 'more-6-cups', label: 'Mais de 6 copos' },
        ],
    },

    // Etapa 25: Preferências Alimentares
    {
        id: 25,
        type: 'multiselect',
        title: 'Quais são suas preferências alimentares?',
        options: [
            {
                id: 'none',
                label: 'Sem restrições',
                description: 'Aberto a todos os alimentos'
            },
            {
                id: 'vegetarian',
                label: 'Eu sou vegetariana',
                description: 'Verduras, cereais, mas sem carne animal',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/diet/vegetarian.png'
            },
            {
                id: 'vegan',
                label: 'Eu sou vegana',
                description: 'Puramente à base de plantas, sem produtos de origem animal',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/diet/vegan.png'
            },
            {
                id: 'gluten-free',
                label: 'Sem glúten',
                description: 'Exclua produtos de cereais que contenham glúten',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/restrictions/gluten.png'
            },
            {
                id: 'lactose-free',
                label: 'Sem lactose',
                description: 'Excluir laticínios',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/restrictions/lactose.png'
            },
            {
                id: 'keto',
                label: 'Dieta cetogênica',
                description: 'Dieta com baixo teor de carboidratos e alto teor de gordura',
                image: 'https://s3.harna-app.com/static_assets/images/quizes/steps/basic/restrictions/keto.png'
            },
        ],
    },

    // Etapa 26: Hábitos
    {
        id: 26,
        type: 'multiselect',
        title: 'Quais desses hábitos você tem?',
        hasSelectAll: true,
        options: [
            { id: 'procrastination', label: 'Procrastinação', icon: '⏰' },
            { id: 'unhealthy-eating', label: 'Alimentação pouco saudável', icon: '🍕' },
            { id: 'social-media', label: 'Redes Sociais', icon: '📱' },
            { id: 'too-much-coffee', label: 'Beber muito café', icon: '☕' },
            { id: 'binge-watching', label: 'Assistir compulsivamente', icon: '📺' },
            { id: 'insecurity', label: 'Insegurança', icon: '💭' },
            { id: 'nail-biting', label: 'Roer as unhas', icon: '💅' },
            { id: 'being-late', label: 'Chegar atrasada', icon: '⏳' },
            { id: 'smoking', label: 'Fumar', icon: '🚬' },
            { id: 'alcohol', label: 'Consumo de álcool', icon: '🍷' },
            { id: 'none', label: 'Nenhum deles' },
        ],
    },

    // Etapa 27: Eventos de Vida (Movida e Atualizada)
    {
        id: 27,
        type: 'multiselect',
        title: 'Escolha quaisquer eventos de vida que levaram ao ganho de peso',
        options: [
            { id: 'marriage', label: 'Casamento ou relacionamento', icon: '❤️' },
            { id: 'busy-life', label: 'Vida profissional ou familiar agitada', icon: '🌪️' },
            { id: 'stress', label: 'Estresse ou saúde mental', icon: '🤯' },
            { id: 'menopause', label: 'Início da menopausa', icon: '🌸' },
            { id: 'medication', label: 'Distúrbio medicamentoso', icon: '💊' },
            { id: 'none', label: 'Nenhuma das opções acima', icon: '✖️' },
        ],
    },

    // Etapa 28: Recupere Seu Corpo (Info - Antiga 27)
    {
        id: 28,
        type: 'info',
        title: 'Recupere Seu Corpo!',
        description: 'Não sabe por onde começar? Nós já planejamos tudo. Não tem certeza de que pode fazer isso? Estamos prontos para motivá-la e apoiá-la!',
        image: 'https://s3.harna-app.com/quizes_images/14198633-c850-4452-a0df-85896a4234f0.png',
        buttonText: 'Continuar',
    },

    // Etapa 29: Gráfico de Projeção (Antiga 28)
    {
        id: 29,
        type: 'chart',
        title: 'O único plano de que você precisará',
        // Descrição e dados são dinâmicos no componente
        buttonText: 'Continuar',
    },

    // Etapa 30: Processamento
    {
        id: 30,
        type: 'processing',
        title: 'Criando seu plano personalizado...',
        description: 'Por favor, aguarde enquanto analisamos suas respostas',
    },

    // Etapa 31: Coleta de Nome (Reinserida)
    {
        id: 31,
        type: 'name',
        title: 'Como devemos chamar você?',
        description: 'Queremos personalizar sua experiência',
    },

    // Etapa 32: Gráfico de Resultado
    {
        id: 32,
        type: 'result-chart',
        buttonText: 'Continuar',
    },

    // Etapa 33: Página de Vendas (Checkout)
    {
        id: 33,
        type: 'checkout',
        title: 'Escolha seu plano',
        description: 'Escolha o plano ideal para você:',
    },
];
