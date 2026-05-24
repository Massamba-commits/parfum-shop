import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePanier } from '../context/PanierContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, profile, isAdmin, deconnexion } = useAuth()
  const { totalArticles } = usePanier()

  const handleDeconnexion = async () => {
    await deconnexion()
    navigate('/')
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">

      {/* Logo */}
      <h1
        onClick={() => navigate('/')}
        className="text-sm font-bold bg-pink-500 text-white hover:bg-pink-600 rounded-lg px-4 py-2 cursor-pointer transition"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        AMKO PARFUMERIE
      </h1>

      {/* Liens */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link to="/"         className="hover:text-pink-400 transition">Accueil</Link>
        <Link to="/products" className="hover:text-pink-400 transition">Boutique</Link>
        <Link to="/contact"  className="hover:text-pink-400 transition">Contact</Link>
        {isAdmin && (
          <Link to="/admin" className="text-pink-400 hover:text-pink-300 font-bold transition">
            ⚙️ Admin
          </Link>
        )}
      </div>

      {/* Droite : panier + auth */}
      <div className="flex items-center gap-3">

        {/* Panier */}
        <button onClick={() => navigate('/panier')}
          className="relative bg-pink-500 hover:bg-pink-600 text-white p-2.5 rounded-full transition shadow">
          🛒
          {totalArticles > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
              {totalArticles}
            </span>
          )}
        </button>

        {/* Auth */}
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden md:block">
              👤 {profile?.nom || user.email}
            </span>
            <button onClick={handleDeconnexion}
              className="text-xs border border-gray-600 hover:border-pink-500 hover:text-pink-400 px-3 py-2 rounded-full transition">
              Déconnexion
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')}
            className="text-xs bg-white text-gray-900 hover:bg-pink-500 hover:text-white font-bold px-4 py-2 rounded-full transition shadow">
            Connexion
          </button>
        )}
      </div>
    </nav>
  )
}