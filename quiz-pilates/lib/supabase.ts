import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hxwkzthncjfnmglyudjk.supabase.co';
const supabaseKey = 'sb_publishable_K2c7J4kRgOaf9-wHOoTfyA_WE8AnzkG'; // Nota: Idealmente em processo.env, mas hardcoded conforme solicitação para "funcionar agora"

export const supabase = createClient(supabaseUrl, supabaseKey);
