import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePanier } from '../context/PanierContext'
import { sauvegarderCommande } from '../Services/commandesService'
import Footer from '../composants/Footer'

export default function Panier() {
  const navigate = useNavigate()
  const { items, retirerDuPanier, modifierQuantite, viderPanier, totalArticles, totalPrix } = usePanier()
  const [loading, setLoading] = useState(false)
  const [commande, setCommande] = useState(false)

  const fraisLivraison = totalPrix > 50000 ? 0 : 2500
  const totalFinal = totalPrix + fraisLivraison

  // ✅ Commander et sauvegarder dans Supabase
  const commander = async () => {
    setLoading(true)
    try {
      await sauvegarderCommande({
        items,
        total: totalPrix,
        frais_livraison: fraisLivraison,
        statut: 'en attente',
      })
      viderPanier()
      setCommande(true)
    } catch (error) {
      alert('❌ Erreur lors de la commande. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  // ───── PAGE SUCCÈS ─────
  if (commande) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Commande confirmée !
        </h2>
        <p className="text-gray-400 mb-8 max-w-sm">
          Merci pour votre achat. Votre commande a été enregistrée et sera traitée rapidement.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={() => navigate('/products')} className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition font-bold shadow">
            Continuer mes achats
          </button>
          <button onClick={() => navigate('/')} className="border border-pink-400 text-pink-500 px-8 py-3 rounded-full hover:bg-pink-50 transition font-bold">
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  // ───── PANIER VIDE ─────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <section className="py-14 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a0010 0%, #3d0030 100%)' }}>
          <p className="text-pink-300 uppercase tracking-widest text-xs font-semibold mb-2">✦ Mon Panier ✦</p>
          <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Georgia, serif' }}>Panier</h1>
        </section>
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Votre panier est vide</h2>
          <p className="text-gray-400 mb-8 max-w-sm">Vous n'avez encore rien ajouté. Découvrez notre sélection de parfums exclusifs.</p>
          <button onClick={() => navigate('/products')} className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-10 py-3 rounded-full transition shadow-lg">
            Découvrir la boutique →
          </button>
        </div>
      </div>
    )
  }

  // ───── PANIER REMPLI ─────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <section className="py-14 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a0010 0%, #3d0030 100%)' }}>
        <p className="text-pink-300 uppercase tracking-widest text-xs font-semibold mb-2">✦ Mon Panier ✦</p>
        <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Georgia, serif' }}>Panier</h1>
        <p className="text-pink-200 mt-2 text-sm">{totalArticles} article{totalArticles > 1 ? 's' : ''} dans votre panier</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste produits */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-700">Mes articles</h2>
            <button onClick={viderPanier} className="text-sm text-red-400 hover:text-red-600 transition font-medium">🗑 Vider le panier</button>
          </div>

          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-0.5 line-clamp-1">{item.description}</p>
                <p className="text-pink-500 font-bold mt-1">{item.price.toLocaleString()} FCFA</p>
              </div>
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button onClick={() => modifierQuantite(item.id, item.quantite - 1)} className="px-3 py-1 text-gray-500 hover:bg-pink-50 hover:text-pink-500 transition font-bold">−</button>
                  <span className="px-3 text-gray-700 font-semibold text-sm">{item.quantite}</span>
                  <button onClick={() => modifierQuantite(item.id, item.quantite + 1)} className="px-3 py-1 text-gray-500 hover:bg-pink-50 hover:text-pink-500 transition font-bold">+</button>
                </div>
                <p className="text-gray-700 font-bold text-sm">{(item.price * item.quantite).toLocaleString()} FCFA</p>
                <button onClick={() => retirerDuPanier(item.id)} className="text-xs text-red-400 hover:text-red-600 transition">✕ Retirer</button>
              </div>
            </div>
          ))}

          <button onClick={() => navigate('/products')} className="mt-2 text-pink-500 hover:text-pink-700 text-sm font-semibold transition">
            ← Continuer mes achats
          </button>
        </div>

        {/* Récapitulatif */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-700 mb-6 pb-4 border-b border-gray-100">Récapitulatif</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Sous-total ({totalArticles} article{totalArticles > 1 ? 's' : ''})</span>
                <span className="font-semibold">{totalPrix.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className={fraisLivraison === 0 ? 'text-green-500 font-semibold' : 'font-semibold'}>
                  {fraisLivraison === 0 ? '✔ Gratuit' : `${fraisLivraison.toLocaleString()} FCFA`}
                </span>
              </div>
              {fraisLivraison > 0 && <p className="text-xs text-gray-400 italic">Livraison gratuite à partir de 50 000 FCFA</p>}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-base">Total</span>
              <span className="text-pink-600 font-extrabold text-xl">{totalFinal.toLocaleString()} FCFA</span>
            </div>

            <div className="mt-5 flex gap-2">
              <input type="text" placeholder="Code promo" className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
              <button className="bg-gray-100 hover:bg-pink-500 hover:text-white text-gray-600 text-sm font-semibold px-4 py-2 rounded-full transition">OK</button>
            </div>

            <button
              onClick={commander}
              disabled={loading}
              className="mt-5 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg hover:shadow-pink-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {loading ? '⏳ Enregistrement...' : 'Commander maintenant 🛍️'}
            </button>

            <div className="mt-5 space-y-2 text-xs text-gray-400 text-center">
              <p>🔒 Paiement 100% sécurisé</p>
              <p>🚚 Livraison rapide 24h–48h</p>
              <p>↩ Retour gratuit sous 7 jours</p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}