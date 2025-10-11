import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';


const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount } = useContext(ShopContext);

    return (
        <>
            <header className='flex items-center justify-between py-5 font-medium'>

                <Link to='/'><img src={assets.logo} alt="" className='w-36' /></Link>

                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                    <NavLink to='/' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>Accueil</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink to='/à-propos' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>À propos</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>Collection</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>Contact</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>

                <section className='flex items-center gap-6'>
                    <img onClick={() => (setShowSearch(true))} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
                    <article className='group relative'>
                        <Link to='/connexion'><img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' /></Link>
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>Mon profil</p>
                                <p className='cursor-pointer hover:text-black'>Commandes</p>
                                <p className='cursor-pointer hover:text-black'>Déconnexion</p>
                            </div>
                        </div>
                    </article>
                    <Link to='/panier' className='relative'>
                        <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />
                </section>

                {/* Menu latérale pour petits écrans */}
                <section className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <article className='flex flex-col test-gray-600'>
                        <div className="flex items-center gap-4 p-3 cursor-pointer" onClick={() => setVisible(false)}>
                            <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
                            <p>Retour</p>
                        </div>
                        <NavLink to='/' className='py-2 pl-6 border' onClick={() => setVisible(false)}>ACCUEIL</NavLink>
                        <NavLink to='/collection' className='py-2 pl-6 border' onClick={() => setVisible(false)}>COLLECTION</NavLink>
                        <NavLink to='/à-propos' className='py-2 pl-6 border' onClick={() => setVisible(false)}>A PROPOS</NavLink>
                        <NavLink to='/contact' className='py-2 pl-6 border' onClick={() => setVisible(false)}>CONTACT</NavLink>
                    </article>
                </section>

            </header>
        </>
    )
}

export default Navbar
