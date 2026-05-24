import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'

interface Commande {
  id: number
  total: number
  statut: string
  date: string
  items: any[]
}

interface Message {
  id: number
  nom: string
  email: string
  sujet: string
  message: string
  date: string
  lu: boolean
}

export default function Admin() {
  const navigate   = useNavigate()
  const { profile, isAdmin, deconnexion,loading: authLoading } = useAuth()
  if (authLoading) return <div>Chargement...</div>

  const [onglet, setOnglet]         = useState<'commandes' | 'messages' | 'stats'>('stats')
  const [commandes, setCommandes]   = useState<Commande[]>([])
  const [messages, setMessages]     = useState<Message[]>([])
  const [loading, setLoading]       = useState(true)

  // Redirection si pas admin
  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/login')
  }, [isAdmin, authLoading])

  useEffect(() => {
    const charger = async () => {
      const [{ data: cmd }, { data: msg }] = await Promise.all([
        supabase.from('commandes').select('*').order('date', { ascending: false }),
        supabase.from('messages').select('*').order('date', { ascending: false }),
      ])
      setCommandes(cmd || [])
      setMessages(msg || [])
      setLoading(false)
    }
    charger()
  }, [])

  const changerStatut = async (id: number, statut: string) => {
    await supabase.from('commandes').update({ statut }).eq('id', id)
    setCommandes(prev => prev.map(c => c.id === id ? { ...c, statut } : c))
  }

  const marquerLu = async (id: number) => {
    await supabase.from('messages').update({ lu: true }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, lu: true } : m))
  }

  const totalRevenu   = commandes.reduce((acc, c) => acc + c.total, 0)
  const messagesNonLus = messages.filter(m => !m.lu).length
  const commandesEnAttente = commandes.filter(c => c.statut === 'en attente').length

  const statutCouleur: Record<string, string> = {
    'en attente': 'bg-yellow-100 text-yellow-700',
    'confirmée':  'bg-blue-100 text-blue-700',
    'expédiée':   'bg-purple-100 text-purple-700',
    'livrée':     'bg-green-100 text-green-700',
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ───── NAVBAR ADMIN ───── */}
      <nav className="bg-gradient-to-r from-gray-900 to-pink-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-pink-400" style={{ fontFamily: 'Georgia, serif' }}>AMKO</span>
          <span className="bg-pink-500 text-xs font-bold px-2 py-1 rounded-full">ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">👤 {profile?.nom || 'Admin'}</span>
          <button onClick={() => navigate('/')} className="text-sm text-gray-300 hover:text-white transition">
            🏠 Site
          </button>
          <button onClick={async () => { await deconnexion(); navigate('/login') }}
            className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition">
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-3xl font-extrabold text-gray-800 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
          Tableau de bord
        </h1>

        {/* ───── STATS ───── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Commandes total',   valeur: commandes.length,      icon: '🛒', color: 'bg-pink-50 border-pink-200' },
            { label: 'En attente',         valeur: commandesEnAttente,    icon: '⏳', color: 'bg-yellow-50 border-yellow-200' },
            { label: 'Revenu total',       valeur: `${totalRevenu.toLocaleString()} F`, icon: '💰', color: 'bg-green-50 border-green-200' },
            { label: 'Messages non lus',   valeur: messagesNonLus,        icon: '📧', color: 'bg-blue-50 border-blue-200' },
          ].map((s) => (
            <div key={s.label} className={`${s.color} border rounded-2xl p-5`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-extrabold text-gray-800">{s.valeur}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ───── ONGLETS ───── */}
        <div className="flex gap-2 mb-6">
          {(['stats', 'commandes', 'messages'] as const).map((o) => (
            <button key={o} onClick={() => setOnglet(o)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
                onglet === o ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-400'}`}>
              {o === 'stats' ? '📊 Vue générale' : o === 'commandes' ? '🛒 Commandes' : '📧 Messages'}
              {o === 'messages' && messagesNonLus > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2">{messagesNonLus}</span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">⏳</div>
            <p>Chargement des données...</p>
          </div>
        ) : (
          <>
            {/* ───── VUE GÉNÉRALE ───── */}
            {onglet === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dernières commandes */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">🛒 Dernières commandes</h3>
                  <div className="space-y-3">
                    {commandes.slice(0, 5).map((c) => (
                      <div key={c.id} className="flex items-center justify-between border-b border-gray-50 pb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Commande #{c.id}</p>
                          <p className="text-xs text-gray-400">{new Date(c.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-pink-600 font-bold text-sm">{c.total.toLocaleString()} FCFA</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statutCouleur[c.statut] || 'bg-gray-100 text-gray-600'}`}>
                            {c.statut}
                          </span>
                        </div>
                      </div>
                    ))}
                    {commandes.length === 0 && <p className="text-gray-400 text-sm">Aucune commande pour l'instant.</p>}
                  </div>
                </div>

                {/* Derniers messages */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">📧 Derniers messages</h3>
                  <div className="space-y-3">
                    {messages.slice(0, 5).map((m) => (
                      <div key={m.id} className={`flex items-start justify-between border-b border-gray-50 pb-2 ${!m.lu ? 'opacity-100' : 'opacity-60'}`}>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">
                            {!m.lu && <span className="w-2 h-2 bg-pink-500 rounded-full inline-block mr-1"></span>}
                            {m.nom}
                          </p>
                          <p className="text-xs text-gray-400">{m.sujet || 'Sans sujet'}</p>
                        </div>
                        <p className="text-xs text-gray-400">{new Date(m.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                    ))}
                    {messages.length === 0 && <p className="text-gray-400 text-sm">Aucun message pour l'instant.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ───── COMMANDES ───── */}
            {onglet === 'commandes' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['#ID', 'Articles', 'Total', 'Date', 'Statut', 'Action'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {commandes.map((c) => (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-bold text-gray-700">#{c.id}</td>
                        <td className="px-4 py-3 text-gray-500">{c.items?.length || 0} article(s)</td>
                        <td className="px-4 py-3 font-bold text-pink-600">{c.total.toLocaleString()} FCFA</td>
                        <td className="px-4 py-3 text-gray-400">{new Date(c.date).toLocaleDateString('fr-FR')}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statutCouleur[c.statut] || 'bg-gray-100 text-gray-600'}`}>
                            {c.statut}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select value={c.statut} onChange={(e) => changerStatut(c.id, e.target.value)}
                            className="border border-gray-200 text-xs px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300 bg-white">
                            <option>en attente</option>
                            <option>confirmée</option>
                            <option>expédiée</option>
                            <option>livrée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {commandes.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-5xl mb-3">🛒</div>
                    <p>Aucune commande pour l'instant.</p>
                  </div>
                )}
              </div>
            )}

            {/* ───── MESSAGES ───── */}
            {onglet === 'messages' && (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={`bg-white rounded-2xl shadow-sm p-6 border-l-4 ${m.lu ? 'border-gray-200' : 'border-pink-500'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-800">{m.nom}
                          {!m.lu && <span className="ml-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">Nouveau</span>}
                        </p>
                        <p className="text-gray-400 text-sm">{m.email}</p>
                        <p className="text-pink-500 text-sm font-semibold mt-1">{m.sujet || 'Sans sujet'}</p>
                      </div>
                      <p className="text-xs text-gray-400">{new Date(m.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">{m.message}</p>
                    {!m.lu && (
                      <button onClick={() => marquerLu(m.id)}
                        className="mt-3 text-xs text-pink-500 hover:text-pink-700 font-semibold transition">
                        ✔ Marquer comme lu
                      </button>
                    )}
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-5xl mb-3">📧</div>
                    <p>Aucun message pour l'instant.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}