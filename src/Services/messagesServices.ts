import { supabase } from '../supabase'

export interface Message {
  id?: number
  nom: string
  email: string
  sujet: string
  message: string
  date?: string
  lu?: boolean
}

// ➕ Envoyer un message
export const envoyerMessage = async (msg: Omit<Message, 'id' | 'date' | 'lu'>) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ ...msg, lu: false }])
    .select()

  if (error) throw error
  return data
}

// 📖 Lire tous les messages
export const lireMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data || []
}