# Quiz Pilates Asiático - Clone Harna

Clone com fidelidade extrema do quiz de Pilates Asiático da Harna, criado com Next.js 14+, React 18+ e Tailwind CSS.

## 🚀 Como Executar

```bash
# Instalar dependências (já instaladas)
npm install

# Executar servidor de desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:3000
```

## ✨ Características

- ✅ **30 etapas completas** exatamente como o site original
- ✅ **Fidelidade visual extrema** (cores, fontes, espaçamentos, animações)
- ✅ **Mobile-first** otimizado para dispositivos móveis
- ✅ **Animações suaves** (fadeIn, transitions, hover effects)
- ✅ **Gerenciamento de estado** com Context API
- ✅ **TypeScript** para type safety
- ✅ **Next.js Image** para otimização de imagens
- ✅ **Tailwind CSS** para estilização rápida e responsiva

## 📁 Estrutura do Projeto

```
quiz-pilates/
├── app/
│   ├── layout.tsx          # Layout raiz com QuizProvider
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globais e animações
├── components/
│   ├── ProgressBar.tsx      # Barra de progresso
│   ├── StepContainer.tsx    # Container das etapas
│   ├── OptionButton.tsx     # Botão de opção simples
│   ├── MultiSelectOption.tsx # Botão de seleção múltipla
│   ├── ContinueButton.tsx   # Botão de continuar
│   └── QuizRenderer.tsx     # Renderizador principal de etapas
├── context/
│   └── QuizContext.tsx      # Context API para estado global
├── data/
│   └── quiz-steps.ts        # Dados das 30 etapas
├── types/
│   └── quiz.ts              # Tipos TypeScript
└── next.config.ts           # Configuração Next.js
```

## 🎨 Design System

### Cores

- **Rosa Principal**: `#d63384`
- **Rosa Gradiente**: `#ff4d94`
- **Texto Escuro**: `#1a1a1a`
- **Texto Médio**: `#444`
- **Texto Claro**: `#666`
- **Borda**: `#e0e0e0`
- **Fundo**: `#ffffff`

### Tipografia

- **Fonte**: Inter (Google Fonts)
- **Título**: 1.6rem, 700
- **Texto**: 1rem, 400
- **Botão**: 1.05-1.1rem, 500-600

### Animações

- **fadeIn**: 0.5s ease (opacity + translateY)
- **Transitions**: 0.2-0.4s ease-in-out
- **Hover Scale**: 1.02

## 📊 Etapas do Quiz

| # | Tipo | Descrição |
|---|------|-----------|
| 1 | Question | Seleção de idade |
| 2 | Info | Introdução aos exercícios |
| 3 | Question | Objetivo principal |
| 4 | MultiSelect | Objetivos adicionais |
| 5 | MultiSelect | Zonas alvo do corpo |
| 6 | Info | Informativa sobre zonas |
| 7-10 | Question | Tipo de corpo, histórico fitness |
| 11 | Info | Benefícios do Pilates |
| 12 | MultiSelect | Sensibilidades de saúde |
| 13 | Question | Nível de conforto |
| 14 | Info | Adaptação de exercícios |
| 15 | Consent | Consentimento de dados |
| 16 | Biometric | Dados biométricos |
| 17 | Question | Estilo de vida |
| 18 | Summary | Resumo informativo |
| 19 | MultiSelect | Atividades adicionais |
| 20 | Info | Combinação de atividades |
| 21 | Question | Hidratação |
| 22 | MultiSelect | Preferências alimentares |
| 23-24 | MultiSelect | Hábitos e eventos de vida |
| 25 | Info | Mensagem de suporte |
| 26 | Chart | Gráfico de projeção de peso |
| 27 | Processing | Tela de loading com depoimentos |
| 28 | Email | Coleta de e-mail |
| 29 | Name | Coleta de nome |
| 30 | Checkout | Página de vendas (3 planos) |

## 🔧 Tecnologias

- **Next.js 16.1.6** (App Router)
- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **Turbopack** (dev server)

## 📝 Notas de Implementação

- Todas as 30 etapas estão funcionais
- Validações implementadas (email, nome, dados biométricos)
- Barra de progresso atualiza automaticamente
- Scroll suave ao trocar de etapa
- Imagens otimizadas com Next/Image
- Sem integração backend (apenas frontend por enquanto)

## 🎯 Próximos Passos (Opcionais)

- [ ] Integração com backend/API
- [ ] Persistência de dados em localStorage
- [ ] Envio de email com resultados
- [ ] Integração com sistema de pagamento
- [ ] Analytics e tracking
- [ ] Testes automatizados

## 📄 Licença

Este é um clone educacional do quiz da Harna. Todos os direitos do design original pertencem à Harna.

---

**Desenvolvido com ❤️ usando Next.js e React**
