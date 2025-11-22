import React from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const OrdersPage = () => {

    const { backendUrl, token, currency } = React.useContext(ShopContext);

    const [orderData, setOrderData] = React.useState([]);

    const loadOrderData = async () => {
        try {
            //
            if (!token) {
                return;
            }

            const response = await axios.post(
                backendUrl + '/api/orders/userOrders', {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {
                let allOrdersItems = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItems.push(item);
                    })
                })
                setOrderData(allOrdersItems.reverse());

            }

        } catch (error) {

        }
    }

    React.useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <>
            <section className="border-t pt-16">
                <article className="text-2xl ">
                    <Title text1={'MES'} text2={'COMMANDES'} />
                </article>
                <article>
                    {
                        orderData.slice(1, 9).map((item, index) => (
                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                <div className='flex items-start gap-6 text-sm'>
                                    <img src={item.image[0]} alt="" className='w-16 sm:w-20 ' />
                                    <div>
                                        <p>{item.name}</p>
                                        <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                            <p className='text-lg'>{item.price} {currency}</p>
                                            <p>Quantité : {item.quantity}</p>
                                            <p>Taille: {item.size}</p>
                                        </div>
                                        <p className='mt-1'>Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString('fr-FR', {day: '2-digit', month: 'short', year: 'numeric'})}</span></p>
                                        <p className='mt-1'>Paiement: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                                    </div>
                                </div>
                                <div className='md:w-1/2 flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='text-sm md:text-base'>{item.status}</p>
                                    </div>
                                    {/* <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-gray-400'></p>
                                        <p className='text-sm md:text-base'>En cours de livraison</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-gray-400'></p>
                                        <p className='text-sm md:text-base'>Livraison terminée</p>
                                    </div> */}
                                    <button className='border px-4 py-2 text-sm font-medium rounded-sm' onClick={loadOrderData}>Suivre la commande</button>
                                </div>
                            </div>
                        ))
                    }
                </article>
            </section>
        </>
    )
}

export default OrdersPage
