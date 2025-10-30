import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom';
import AddPage from './pages/AddPage';
import ListPage from './pages/ListPage'
import OrdersPage from './pages/OrdersPage'
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() =>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <section className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        :
        (<>
          {/* Barre de navigation en haut */}
          < Navbar setToken={setToken} />
          <hr />
          {/* Conteneur principal : Sidebar + contenu */}
          <aside className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max-(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/ajouter' element={<AddPage token={token} />} />
                <Route path='/catalogues' element={<ListPage token={token} />} />
                <Route path='/commandes' element={<OrdersPage token={token} />} />
              </Routes>
            </div>
          </aside>
        </>)}
    </section>
  )
}

export default App