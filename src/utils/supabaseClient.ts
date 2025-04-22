import { createClient } from '@supabase/supabase-js'

// Usa variáveis de ambiente que começam com NEXT_PUBLIC_ (disponíveis no client)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
