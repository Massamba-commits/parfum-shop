import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './composants/Navbar'
import Footer from './composants/Footer'
import Shop from './pages/Shop'
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/products" element={<Shop />} />
        </Routes>
        <footer />
      </div>
    </BrowserRouter>
  )
}

export default App