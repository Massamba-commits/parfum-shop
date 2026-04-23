import Footer from '../composants/Footer'
import { products } from '../data/products'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ───── HERO ───── */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0010 0%, #3d0030 50%, #1a0010 100%)',
        }}
      >
        {/* cercles décoratifs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #f9a8d4, transparent)',
            top: '-80px', left: '-80px',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #f9a8d4, transparent)',
            bottom: '-60px', right: '-60px',
          }}
        />

        <p className="text-pink-300 uppercase tracking-widest text-xs mb-3 font-semibold">
          ✦ Collection Exclusive ✦
        </p>
        <h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}
        >
          AMKO
          <span className="block text-pink-400">Parfumerie</span>
        </h1>
        <p className="text-pink-200 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
          Des fragrances d'exception qui racontent votre histoire. Découvrez notre sélection de parfums raffinés.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-pink-500/40 hover:scale-105"
          >
            Découvrir la boutique
          </button>
          <button
            className="border border-pink-400 text-pink-300 hover:bg-pink-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-all"
          >
            En savoir plus
          </button>
        </div>
      </section>

      {/* ───── BANDE AVANTAGES ───── */}
      <section className="bg-pink-500 text-white py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-around gap-3 text-sm font-semibold text-center px-4">
          <span>🚚 Livraison rapide</span>
          <span>💯 Produits authentiques</span>
          <span>🎁 Emballage cadeau offert</span>
          <span>🔒 Paiement sécurisé</span>
        </div>
      </section>

      {/* ───── SECTION PRODUITS ───── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-pink-500 uppercase tracking-widest text-xs font-bold mb-2">
            ✦ Nos Produits ✦
          </p>
          <h2
            className="text-4xl font-extrabold text-gray-800"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Parfums Populaires
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Une sélection soigneusement choisie de parfums pour homme, femme et mixtes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
            >
              <div className="relative overflow-hidden h-64 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Nouveau
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-pink-600 font-extrabold text-xl">
                    {product.price} <span className="text-sm font-semibold">FCFA</span>
                  </span>
                  <div className="flex text-yellow-400 text-sm">
                    ★★★★★
                  </div>
                </div>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 w-full bg-pink-500 text-white py-2.5 rounded-xl hover:bg-pink-600 transition font-semibold tracking-wide shadow hover:shadow-pink-300"
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold px-10 py-3 rounded-full transition-all"
          >
            Voir tous les produits →
          </button>
        </div>
      </section>

      {/* ───── SECTION POURQUOI NOUS ───── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className="text-pink-500 uppercase tracking-widest text-xs font-bold mb-2">✦ Pourquoi nous ✦</p>
          <h2 className="text-4xl font-extrabold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
            L'Excellence au Quotidien
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🌹', titre: 'Fragrances de Luxe', texte: 'Sélection rigoureuse de parfums haut de gamme pour toutes les occasions.' },
            { icon: '🎀', titre: 'Service Premium', texte: 'Emballage soigné, livraison rapide et service client disponible 7j/7.' },
            { icon: '💎', titre: 'Authenticité Garantie', texte: 'Tous nos produits sont 100% authentiques, directement des marques.' },
          ].map((item) => (
            <div key={item.titre} className="bg-pink-50 rounded-2xl p-8 hover:shadow-md transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{item.titre}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── BANNIÈRE CTA ───── */}
      <section
        className="py-16 px-6 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #1a0010, #3d0030)' }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Prêt à trouver votre fragrance idéale ?
        </h2>
        <p className="text-pink-200 mb-8 max-w-md mx-auto">
          Explorez notre boutique et trouvez le parfum qui vous correspond parfaitement.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-10 py-3 rounded-full transition-all shadow-lg hover:scale-105"
        >
          Visiter la boutique 🛍️
        </button>
      </section>

      <Footer />
    </div>
  )
}