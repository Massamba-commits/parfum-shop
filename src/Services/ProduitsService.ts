import { supabase } from '../supabase'

export interface Produit {
  id?: number
  name: string
  price: number
  image: string
  description: string
  categorie: 'Homme' | 'Femme' | 'Mixte'
  stock: number
}

// 📖 Lire tous les produits
export const lireProduits = async (): Promise<Produit[]> => {
  const { data, error } = await supabase
    .from('produits')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

// ➕ Ajouter un produit
export const ajouterProduit = async (produit: Omit<Produit, 'id'>) => {
  const { data, error } = await supabase
    .from('produits')
    .insert([produit])
    .select()

  if (error) throw error
  return data
}

// ✏️ Modifier un produit
export const modifierProduit = async (id: number, updates: Partial<Produit>) => {
  const { error } = await supabase
    .from('produits')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

// 🗑 Supprimer un produit
export const supprimerProduit = async (id: number) => {
  const { error } = await supabase
    .from('produits')
    .delete()
    .eq('id', id)

  if (error) throw error
}