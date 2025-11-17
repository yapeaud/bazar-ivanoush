import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddPage from './pages/AddPage.jsx'
import ListPage from './pages/ListPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = import.meta.env.VITE_CURRENCY

const App = () => {

    const [token, setToken] = React.useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

    React.useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    return (
        <main className='bg-gray-50 min-h-screen'>
            <ToastContainer />
            {token === ''
                ? <Login setToken={setToken} />
                : <>
                    <Navbar setToken={setToken}  />
                    <hr />
                    <section className='flex w-full'>
                        <Sidebar />
                        <article className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                            <Routes>
                                <Route path="/ajouter" element={<AddPage token={token} />} />
                                <Route path="/catalogues" element={<ListPage token={token} />} />
                                <Route path="/commandes" element={<OrdersPage token={token} />} />
                            </Routes>
                        </article>
                    </section>
                </>
            }
        </main>
    )
}

export default App