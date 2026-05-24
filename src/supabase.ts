import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL  // ← ta Project URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY  // ← ta anon key

export const supabase = createClient(supabaseUrl, supabaseKey)