import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { connexion, inscription } = useAuth()

  const [mode, setMode]       = useState<'connexion' | 'inscription'>('connexion')
  const [form, setForm]       = useState({ nom: '', email: '', password: '', confirm: '' })
  const [erreur, setErreur]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErreur('')
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setErreur('')

    // ── Validations ──
    if (!form.email || !form.password) {
      setErreur('Veuillez remplir tous les champs.')
      return
    }
    if (mode === 'inscription') {
      if (!form.nom) {
        setErreur('Veuillez entrer votre nom.')
        return
      }
      if (form.password.length < 6) {
        setErreur('Le mot de passe doit faire au moins 6 caractères.')
        return
      }
      if (form.password !== form.confirm) {
        setErreur('Les mots de passe ne correspondent pas.')
        return
      }
    }

    setLoading(true)

    try {
      if (mode === 'connexion') {
        // ✅ connexion retourne le profil avec le rôle
        const profil = await connexion(form.email, form.password)
        if (profil?.role === 'admin') navigate('/admin')
        else navigate('/')

      } else {
        // ✅ inscription puis redirection accueil
        await inscription(form.email, form.password, form.nom)
        navigate('/')
      }

    } catch (err: any) {
      const messages: Record<string, string> = {
        'Invalid login credentials':    'Email ou mot de passe incorrect.',
        'Email already registered':     'Cet email est déjà utilisé.',
        'Password should be at least 6':'Mot de passe trop court (6 caractères min).',
        'Unable to validate email':     'Adresse email invalide.',
        'User already registered':      'Cet email est déjà utilisé.',
      }
      const msg = Object.entries(messages).find(([key]) => err.message?.includes(key))
      setErreur(msg ? msg[1] : 'Une erreur est survenue. Réessayez.')

    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #1a0010 0%, #3d0030 100%)' }}
    >
      {/* Cercles décoratifs */}
      <div className="absolute w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', top: '-80px', left: '-80px' }} />
      <div className="absolute w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', bottom: '-60px', right: '-60px' }} />

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-extrabold text-pink-500 cursor-pointer"
            onClick={() => navigate('/')}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            AMKO
          </h1>
          <p className="text-gray-400 text-sm mt-1">Parfumerie</p>
        </div>

        {/* Onglets */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('connexion'); setErreur('') }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              mode === 'connexion' ? 'bg-white shadow text-pink-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🔐 Connexion
          </button>
          <button
            onClick={() => { setMode('inscription'); setErreur('') }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              mode === 'inscription' ? 'bg-white shadow text-pink-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            ✅ Inscription
          </button>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">

          {mode === 'inscription' && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Nom complet *</label>
              <input
                type="text" name="nom" value={form.nom} onChange={handleChange}
                placeholder="Ex : Aminata Diallo"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Adresse email *</label>
            <input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="exemple@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Mot de passe *</label>
            <input
              type="password" name="password" value={form.password} onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {mode === 'inscription' && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Confirmer le mot de passe *</label>
              <input
                type="password" name="confirm" value={form.confirm} onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          )}

          {/* Erreur */}
          {erreur && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl">
              ❌ {erreur}
            </div>
          )}

          {/* Bouton */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition shadow hover:shadow-pink-300 active:scale-95 disabled:opacity-60"
          >
            {loading
              ? '⏳ Chargement...'
              : mode === 'connexion' ? '🔐 Se connecter' : '✅ Créer mon compte'
            }
          </button>

          {mode === 'connexion' && (
            <p className="text-center text-xs text-gray-400 hover:text-pink-500 cursor-pointer transition">
              Mot de passe oublié ?
            </p>
          )}
        </div>

        {/* Retour accueil */}
        <p
          onClick={() => navigate('/')}
          className="text-center text-sm text-gray-400 hover:text-pink-500 mt-5 cursor-pointer transition"
        >
          ← Retour à l'accueil
        </p>
      </div>
    </div>
  )
}