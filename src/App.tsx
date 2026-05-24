import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home    from './pages/Home'
import Navbar  from './composants/Navbar'
import Shop    from './pages/Shop'
import Panier  from './pages/panier'
import Contact from './pages/Contact'
import Login   from './pages/login'
import Admin   from './pages/Admin'
import { PanierProvider } from './context/PanierContext'
import { AuthProvider }   from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PanierProvider>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              {/* Pages avec Navbar */}
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/products" element={<><Navbar /><Shop /></>} />
              <Route path="/panier"   element={<><Navbar /><Panier /></>} />
              <Route path="/contact"  element={<><Navbar /><Contact /></>} />

              {/* Pages sans Navbar */}
              <Route path="/login"  element={<Login />} />
              <Route path="/admin"  element={<Admin />} />
            </Routes>
          </div>
        </PanierProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App