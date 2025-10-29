import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <>
            <section className='w-[18%] min-h-screen border-r-2'>
                <article className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                    <NavLink to="/ajouter" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.add_icon} alt="" className='w-5 h-5' />
                        <p className='hidden md:block'>Ajouter des articles</p>
                    </NavLink>

                    <NavLink to="/catalogues" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.order_icon} alt="" className='w-5 h-5' />
                        <p className='hidden md:block'>Ctalogues</p>
                    </NavLink>

                    <NavLink to="/commandes" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.order_icon} alt="" className='w-5 h-5' />
                        <p className='hidden md:block'>Commandes</p>
                    </NavLink>
                </article>
            </section>
        </> 
    )
}

export default Sidebar