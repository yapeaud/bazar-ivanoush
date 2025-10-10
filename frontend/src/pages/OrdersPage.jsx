import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const OrdersPage = () => {

    const {products, currency} = useContext(ShopContext);
    return (
        <>
            <section className="border-t pt-16">
                <article className="text-2xl ">
                    <Title text1={'MES'} text2={'COMMANDES'} />
                </article>
                <article>
                    {
                        products.slice(1,4).map((item, index) =>(
                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                <div className='flex items-start gap-6 text-sm'>
                                    <img src={item.image[0]} alt="" className='w-16 sm:w-20 ' />
                                    <div>
                                        <p>{item.name}</p>
                                        <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                            <p className='text-lg'>{item.price} {currency}</p>
                                            {/* <p>Quantité : {item.quantity}</p>
                                            <p>Taille: {item.size}</p> */}
                                            <p>Quantité: 1</p>
                                            <p>Taille: M</p>
                                        </div>
                                        {/* <p>Date: {item.date} <span className='text-gray-400'></span></p> */}
                                        <p className='mt-2'>Date: <span className='text-gray-400'>25, Jul, 2024</span></p>
                                    </div>
                                </div>
                                <div className='md:w-1/2 flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='text-sm md:text-base'>Prêts à être expédié</p>
                                    </div>
                                    {/* <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-gray-400'></p>
                                        <p className='text-sm md:text-base'>En cours de livraison</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-gray-400'></p>
                                        <p className='text-sm md:text-base'>Livraison terminée</p>
                                    </div> */}
                                    <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Suivre la commande</button>   
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
