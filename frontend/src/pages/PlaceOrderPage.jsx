import { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'


const PlaceOrderPage = () => {

    const [method, setMethod] = useState('cod');

    const {navigate} = useContext(ShopContext);

    return (
        <>
            <section className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

                {/* ---------- Côté Gauche ---------- */}
                <aside className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                    <article className='text-xl sm:text-2xl my-3 '>
                        <Title text1={'INFORMATIONS SUR'} text2={'LA LIVRAISON'} />
                    </article>
                    <article className='flex gap-3'>
                        <input type="text" placeholder='Prénoms' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                        <input type="text" placeholder='Nom' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    </article>
                    <input type="email" placeholder='Adresse e-mail' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input type="text" placeholder='Rue' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <article className='flex gap-3'>
                        <input type="text" placeholder='Ville' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                        <input type="text" placeholder='État' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    </article>
                    <article className='flex gap-3'>
                        <input type="number" placeholder='Code postal' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                        <input type="text" placeholder='Pays' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    </article>
                    <input type="number" placeholder='Téléphone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </aside>

                {/* ---------- Côte Droite ---------- */}
                <aside className='mt-8'>
                    <article className='mt-8 min-w-80'>
                        <CartTotal />
                    </article>
                    <article className='mt-12'>
                        <Title text1={'METHODE DE'} text2={'PAYEMENT'} />
                        {/* --------- Sélection de la methode de paiement --------- */}
                        <div className='flex gap-3 flex-col lg:flex-row'>
                            <div className='flex items-center gap-3 bordder p-2 px-3 cursor-pointer' onClick={() => setMethod('stripe')}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                                {/* <input type="radio" name="payment " id="" /> */}
                                <img src={assets.stripe_logo} alt="" className='h-5 mx-5' />
                            </div>
                            <div className='flex items-center gap-3 bordder p-2 px-3 cursor-pointer' onClick={() => setMethod('razorpay')}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                                <img src={assets.razorpay_logo} alt="" className='h-5 mx-5' />
                            </div>
                            <div className='flex items-center gap-3 bordder p-2 px-3 cursor-pointer' onClick={() => setMethod('wave')}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'wave' ? 'bg-green-400' : ''}`}></p>
                                <img src={assets.wave_logo} alt="" className='h-5 mx-5' />
                            </div> 
                            <div className='flex items-center gap-3 bordder p-2 px-3 cursor-pointer' onClick={() => setMethod('om')}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'om' ? 'bg-green-400' : ''}`}></p>
                                <img src={assets.om_logo} alt="" className='h-5 mx-5' />
                            </div>
                            <div className='flex items-center gap-3 bordder p-2 px-3 cursor-pointer' onClick={() => setMethod('cod')}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                                <p className='text-gray-500 text-sm font-medium mx-4'>PAIEMENT À LA LIVRAISON</p>
                            </div>
                        </div>

                        <div className='w-full text-end mt-8'>
                            <button className='bg-black text-white text-sm px-16 py-3' onClick={() => navigate('/commandes')}>PASSER LA COMMANDE</button>
                        </div>
                    </article>
                </aside>
            </section>
        </>
    )
}

export default PlaceOrderPage
