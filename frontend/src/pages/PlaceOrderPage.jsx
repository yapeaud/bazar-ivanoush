import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'  

const PlaceOrderPage = () => {

    const [method, setMethod] = React.useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, calculateDeliveryFee, products } = React.useContext(ShopContext);
    const [formData, setFormData] = React.useState({
        fullName: '',          // Nom et prénoms
        phone: '',             // Contact à joindre
        deliveryPlace: '',     // Lieu de livraison
        yangoStreet: '',       // Rue sur Yango
        city: ''               // Ville d’expédition
    });

    // Calculer les frais de livraison en fonction de la ville
    const deliveryFee = calculateDeliveryFee(formData.city);

    // Fonction pour mettre à jour les données du formulaire
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    // Fonction pour soumettre le formulaire
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.quantity = cartItems[items][item];
                            itemInfo.size = item;
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + deliveryFee,
                paymentMethod: method
            };

            switch (method) {
                case "cod":
                    const response = await axios.post(
                        backendUrl + '/api/orders/place',
                        orderData,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    if (response.data.success) {
                        setCartItems({});
                        navigate('/commandes');
                    } else {
                        toast.error(response.data.message || "Erreur lors de la commande.");
                    }
                    break;
            
                default:
                    break;
            }

        } catch (error) {
            console.error("Erreur détaillée:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Erreur serveur. Veuillez réessayer.");
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
                {/* ---------- Côté Gauche ---------- */}
                <aside className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <article className="text-xl sm:text-2xl mb-2">
                        <Title text1={'INFORMATIONS SUR'} text2={'LA LIVRAISON'} />
                    </article>

                    {/* Nom et prénoms */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Nom et prénoms <span className='text-pink-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Entrez votre nom complet"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                            name='fullName'
                            value={formData.fullName}
                            onChange={onChangeHandler}
                            required
                        />
                    </article>

                    {/* Contact */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Contact à joindre <span className='text-pink-600'>*</span></label>
                        <input
                            type="tel"
                            placeholder="Ex: 0700000000"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                            name='phone'
                            value={formData.phone}
                            onChange={onChangeHandler}
                            required
                        />
                    </article>

                    {/* Lieu de livraison */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Lieu de livraison <span className='text-pink-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Ex: Cocody, Riviera 2"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                            name='deliveryPlace'
                            value={formData.deliveryPlace}
                            onChange={onChangeHandler}
                            required
                        />
                    </article>

                    {/* Rue sur Yango */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Rue sur Yango <span className='text-pink-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Nom de la rue (comme sur Yango)"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                            name='yangoStreet'
                            value={formData.yangoStreet}
                            onChange={onChangeHandler}
                            required
                        />
                    </article>

                    {/* Ville d’expédition */}
                    <article>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">Ville d’expédition</label>
                        <input
                            type="text"
                            placeholder="Entrez votre ville"
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:border-black focus:outline-none"
                            name='city'
                            value={formData.city}
                            onChange={onChangeHandler}
                        />

                        <p className="text-sm text-gray-600 mt-1">
                            Frais d’expédition : <span className="font-medium text-black">{deliveryFee} FCFA</span>
                        </p>
                    </article>
                </aside>

                {/* ---------- Côte Droite ---------- */}
                <aside className='mt-8'>
                    <article className='mt-8 min-w-80'>
                        <CartTotal deliveryCity={formData.city} />
                    </article>
                    <article className='mt-12'>
                        <Title text1={'METHODE DE'} text2={'PAYEMENT'} />
                        {/* --------- Sélection de la methode de paiement --------- */}
                        <div className='flex gap-3 flex-col lg:flex-row'>
                            <div className='flex items-center gap-3 bordder p-2 px-3 cursor-pointer' onClick={() => setMethod('stripe')}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
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
                            <button type='submit' className='bg-black text-white text-sm px-16 py-3'>PASSER LA COMMANDE</button>
                        </div>
                    </article>
                </aside>
            </form>
        </>
    )
}

export default PlaceOrderPage