import { supabase } from '../supabase'
import type { PanierItem } from '../context/PanierContext'

export interface Commande {
  id?: number
  items: PanierItem[]
  total: number
  frais_livraison: number
  statut: string
  date?: string
  user_id?: string
}

// ➕ Sauvegarder une commande
export const sauvegarderCommande = async (commande: Omit<Commande, 'id' | 'date'>) => {
  const { data, error } = await supabase
    .from('commandes')
    .insert([{ ...commande, statut: 'en attente' }])
    .select()

  if (error) throw error
  return data
}

// 📖 Lire toutes les commandes
export const lireCommandes = async (): Promise<Commande[]> => {
  const { data, error } = await supabase
    .from('commandes')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data || []
}