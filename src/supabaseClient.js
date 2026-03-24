import { createClient } from '@supabase/supabase-js';

// Reemplaza estas variables con las tuyas de tu proyecto Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
