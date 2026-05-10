import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import Footer from '../composants/Footer'
import { usePanier } from '../context/PanierContext'

const categories = ['Tous', 'Homme', 'Femme', 'Mixte']
const tris = ['Pertinence', 'Prix croissant', 'Prix décroissant', 'Nouveautés']

export default function Shop() {
  const navigate = useNavigate()
  const { ajouterAuPanier, totalArticles } = usePanier() // ✅ depuis le contexte

  const [categorie, setCategorie] = useState('Tous')
  const [tri, setTri] = useState('Pertinence')
  const [recherche, setRecherche] = useState('')
  const [notification, setNotification] = useState('')

  // ✅ Fonction ajouter au panier correcte
  const handleAjouter = (product: typeof products[0]) => {
    ajouterAuPanier({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    })
    setNotification(`✅ "${product.name}" ajouté au panier !`)
    setTimeout(() => setNotification(''), 3000)
  }

  const produitsFiltres = products
    .filter((p) => {
      const matchCat =
        categorie === 'Tous' || (p as any).categorie === categorie
      const matchRecherche = p.name
        .toLowerCase()
        .includes(recherche.toLowerCase())
      return matchCat && matchRecherche
    })
    .sort((a, b) => {
      if (tri === 'Prix croissant') return a.price - b.price
      if (tri === 'Prix décroissant') return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ───── HERO BOUTIQUE ───── */}
      <section
        className="relative py-16 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0010 0%, #3d0030 50%, #1a0010 100%)',
        }}
      >
        <div
          className="absolute w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', top: '-60px', left: '-60px' }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', bottom: '-40px', right: '-40px' }}
        />
        <p className="text-pink-300 uppercase tracking-widest text-xs mb-2 font-semibold">
          ✦ Notre Collection ✦
        </p>
        <h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          La Boutique
        </h1>
        <p className="text-pink-200 text-base max-w-md mx-auto">
          Découvrez notre sélection exclusive de parfums de luxe pour toutes les occasions.
        </p>

        {/* Barre de recherche */}
        <div className="mt-8 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Rechercher un parfum..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full py-3 pl-5 pr-12 rounded-full bg-white/10 border border-pink-400/40 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur"
          />
          <span className="absolute right-4 top-3 text-pink-300 text-xl">🔍</span>
        </div>
      </section>

      {/* ───── NOTIFICATION ───── */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl font-semibold">
          {notification}
        </div>
      )}

      {/* ───── FILTRES ───── */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorie(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                categorie === cat
                  ? 'bg-pink-500 text-white border-pink-500 shadow'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-400 hover:text-pink-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={tri}
            onChange={(e) => setTri(e.target.value)}
            className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          >
            {tris.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          {/* ✅ Bouton panier → redirige vers /panier avec compteur du contexte */}
          <button
            onClick={() => navigate('/panier')}
            className="relative bg-pink-500 text-white p-2.5 rounded-full hover:bg-pink-600 transition shadow"
            title="Mon panier"
          >
            🛒
            {totalArticles > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalArticles}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Compteur résultats */}
      <div className="max-w-7xl mx-auto px-4 pb-2 text-sm text-gray-400">
        {produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''} trouvé{produitsFiltres.length > 1 ? 's' : ''}
      </div>

      {/* ───── GRILLE PRODUITS ───── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {produitsFiltres.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold">Aucun produit trouvé</p>
            <p className="text-sm mt-2">Essayez un autre mot-clé ou une autre catégorie.</p>
            <button
              onClick={() => { setRecherche(''); setCategorie('Tous') }}
              className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
            {produitsFiltres.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    ✨ Nouveau
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button
                      onClick={() => handleAjouter(product)}
                      className="bg-white text-pink-600 text-xs font-bold px-4 py-2 rounded-full hover:bg-pink-500 hover:text-white transition shadow"
                    >
                      🛒 Ajouter
                    </button>
                  </div>
                </div>

                {/* Infos */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 text-lg truncate">{product.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2 leading-relaxed">{product.description}</p>

                  <div className="flex items-center gap-1 mt-2">
                    {[1,2,3,4,5].map((i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-gray-400 text-xs ml-1">(24)</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-pink-600 font-extrabold text-xl">
                      {product.price.toLocaleString()}{' '}
                      <span className="text-sm font-semibold">FCFA</span>
                    </span>
                    <span className="text-green-500 text-xs font-semibold">✔ En stock</span>
                  </div>

                  {/* ✅ Bouton corrigé */}
                  <button
                    onClick={() => handleAjouter(product)}
                    className="mt-4 w-full bg-pink-500 text-white py-2.5 rounded-xl hover:bg-pink-600 active:scale-95 transition-all font-semibold tracking-wide shadow hover:shadow-pink-300"
                  >
                    🛒 Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ───── NEWSLETTER ───── */}
      <section
        className="py-14 px-6 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #1a0010, #3d0030)' }}
      >
        <p className="text-pink-300 uppercase tracking-widest text-xs font-bold mb-2">✦ Restez informé ✦</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Offres & Nouveautés
        </h2>
        <p className="text-pink-200 mb-6 max-w-sm mx-auto text-sm">
          Inscrivez-vous pour recevoir nos meilleures offres et les nouveaux parfums en exclusivité.
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 min-w-0 py-3 px-5 rounded-full bg-white/10 border border-pink-400/40 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-full transition whitespace-nowrap">
            S'inscrire
          </button>
        </div>
      </section>
    </div>
  )
}