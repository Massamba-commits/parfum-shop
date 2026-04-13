import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './composants/Navbar'
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<h1>Produits</h1>} />
          <Route path="/product/:id" element={<h1>Produit Details</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
