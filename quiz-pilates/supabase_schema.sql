-- (Opcional) Remover tabela antiga se quiser limpar
drop table if exists funnel_events;

-- Nova tabela focada em SESSIONS (Uma linha por usuário)
create table quiz_sessions (
  session_id text primary key,     -- ID único da sessão (chave primária)
  
  -- Progresso
  last_step text not null,         -- Última etapa alcançada (ex: '5', 'checkout')
  max_step_number integer default 0, -- Número da etapa para ordenação (1, 2, 3...)
  
  -- UTMs e Origem (Gravados na primeira visita)
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index para performance
create index idx_sessions_updated on quiz_sessions(updated_at);

-- Habilitar RLS
alter table quiz_sessions enable row level security;

-- Permitir que qualquer um crie ou atualize sua própria sessão
-- (Na prática, para tracking público, permitimos anon insert/update)
create policy "Allow publics insert/update" 
on quiz_sessions 
for all 
to anon 
using (true) 
with check (true);
