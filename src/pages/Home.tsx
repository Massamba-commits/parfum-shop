import { products } from '../data/products'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <h1 className="text-center text-white bg-pink-500 font-bold text-xl py-3">
        AMKO-Parfumerie
      </h1>

      {/* Produits */}
      <div className="grid grid-cols-1 h-screen gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4"
          >

            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-120 object-cover rounded-xl"
            />

            <h2 className="font-bold mt-3 text-lg text-pink-500">{product.name}</h2>

            <p className="text-gray-500 text-sm">
              {product.description}
            </p>

            <p className="text-pink-600 font-bold mt-2">
              {product.price} FCFA
            </p>
          <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
             Boutique
            </button>
          </div>
          
        ))}
      </div>

    </div>
  )
}