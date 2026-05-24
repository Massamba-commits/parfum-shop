import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../supabase'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  nom: string
  email: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isAdmin: boolean
  inscription: (email: string, password: string, nom: string) => Promise<void>
  connexion: (email: string, password: string) => Promise<UserProfile | null> // ✅ retourne le profil
  deconnexion: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const chargerProfil = async (userId: string) => {
    const { data } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) setProfile(data)
    return data as UserProfile | null
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) chargerProfil(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) chargerProfil(session.user.id)
      else setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ➕ Inscription
  const inscription = async (email: string, password: string, nom: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (data.user) {
      const { error: insertError } = await supabase
        .from('utilisateurs')
        .insert([{ id: data.user.id, nom, email, role: 'user' }])
      if (insertError) console.error('Erreur insert utilisateur:', insertError.message)
    }
  }

  // 🔐 Connexion — retourne le profil pour la redirection
  const connexion = async (email: string, password: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    if (data.user) {
      const { data: profil } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profil) {
        setProfile(profil)
        return profil as UserProfile  // ✅ retourne le profil avec le rôle
      }
    }
    return null
  }

  // 🚪 Déconnexion
  const deconnexion = async () => {
    await supabase.auth.signOut()
    setProfile(null)
    setUser(null)
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, inscription, connexion, deconnexion }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être dans AuthProvider')
  return ctx
}