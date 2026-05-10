import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-sm font-bold bg-pink-500 text-black hover:bg-pink-600 rounded-lg px-4 py-2">AMKO PARFUMERIE</h1>
      <div className="space-x-4">
        <Link to="/">Accueil</Link>
        <Link to="/products">Boutique</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/panier">Panier</Link>
        
        
      </div>
    </nav>
  )
}