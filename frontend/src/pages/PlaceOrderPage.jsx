import { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'


const PlaceOrderPage = () => {

    const [method, setMethod] = useState('cod');

    const { navigate } = useContext(ShopContext);

    return (
        <>
            <section className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

                {/* ---------- Côté Gauche ---------- */}
                <aside className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <article className="text-xl sm:text-2xl mb-2">
                        <Title text1={'INFORMATIONS SUR'} text2={'LA LIVRAISON'} />
                    </article>

                    {/* Nom et prénoms */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Nom et prénoms</label>
                        <input
                            type="text"
                            placeholder="Entrez votre nom complet"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                        />
                    </article>

                    {/* Contact */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Contact à joindre</label>
                        <input
                            type="tel"
                            placeholder="Ex: 0700000000"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                        />
                    </article>

                    {/* Lieu de livraison */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Lieu de livraison</label>
                        <input
                            type="text"
                            placeholder="Ex: Cocody, Riviera 2"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                        />
                    </article>

                    {/* Rue sur Yango */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Rue sur Yango</label>
                        <input
                            type="text"
                            placeholder="Nom de la rue (comme sur Yango)"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                        />
                    </article>

                    {/* Ville d’expédition */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Ville d’expédition</label>
                        <input type="text" placeholder="Entrez votre ville" className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none" />

                        <p className="text-sm text-gray-600 mt-1">
                            Frais d’expédition : <span className="font-medium text-black">3000 FCFA</span> (toutes les villes)
                        </p>
                    </article>
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
