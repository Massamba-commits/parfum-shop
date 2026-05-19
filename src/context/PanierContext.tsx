import { createContext, useContext, useEffect, useState} from 'react'
import type { ReactNode } from 'react';



export interface PanierItem {
  id: number
  name: string
  price: number
  image: string
  description: string
  quantite: number
}

interface PanierContextType {
  items: PanierItem[]
  ajouterAuPanier: (produit: Omit<PanierItem, 'quantite'>) => void
  retirerDuPanier: (id: number) => void
  modifierQuantite: (id: number, quantite: number) => void
  viderPanier: () => void
  totalArticles: number
  totalPrix: number
}

const PanierContext = createContext<PanierContextType | null>(null)

export function PanierProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PanierItem[]>(() => {
    try {
      const sauvegarde = localStorage.getItem('amko_panier')
      return sauvegarde ? JSON.parse(sauvegarde) : []
    } catch {
      return []
    }
  })
  //  2. Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('amko_panier', JSON.stringify(items))
  }, [items])

  const ajouterAuPanier = (produit: Omit<PanierItem, 'quantite'>) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === produit.id)
      if (existe) {
        return prev.map((i) =>
          i.id === produit.id ? { ...i, quantite: i.quantite + 1 } : i
        )
      }
      return [...prev, { ...produit, quantite: 1 }]
    })
  }

  const retirerDuPanier = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const modifierQuantite = (id: number, quantite: number) => {
    if (quantite <= 0) {
      retirerDuPanier(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantite } : i))
    )
  }

  const viderPanier = () => setItems([])

  const totalArticles = items.reduce((acc, i) => acc + i.quantite, 0)
  const totalPrix = items.reduce((acc, i) => acc + i.price * i.quantite, 0)

  return (
    <PanierContext.Provider
      value={{
        items,
        ajouterAuPanier,
        retirerDuPanier,
        modifierQuantite,
        viderPanier,
        totalArticles,
        totalPrix,
      }}
    >
      {children}
    </PanierContext.Provider>
  )
}

export function usePanier() {
  const ctx = useContext(PanierContext)
  if (!ctx) throw new Error('usePanier doit être dans PanierProvider')
  return ctx
}