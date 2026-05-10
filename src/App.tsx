import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './composants/Navbar'
import Footer from './composants/Footer'
import Shop from './pages/Shop'
import Panier from './pages/panier'
import { PanierProvider } from './context/PanierContext'
import Contact from './pages/Contact'
function App() {
  return (
    <BrowserRouter>
    <PanierProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </PanierProvider>
    </BrowserRouter>
  )
}

export default App