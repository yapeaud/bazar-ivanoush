import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrdersPage from './pages/OrdersPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <section className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/collection' element={<CollectionPage />} />
          <Route path='/à-propos' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/produits/:productId' element={<ProductPage />} />
          <Route path='/panier' element={<CartPage />} />
          <Route path='/connexion' element={<LoginPage />} />
          <Route path='/passer-commande' element={<PlaceOrderPage />} />
          <Route path='/commandes' element={<OrdersPage />} />
        </Routes>

        <Footer />
      </section>
    </>
  )
}

export default App
