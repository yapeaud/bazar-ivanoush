import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const  [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) =>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products]);

    return (
        <>
            <section className='my-10'>
                <article className='text-center text-3xl py-8'>
                    <Title text1={'MEILLEURS'} text2={'VENTES'} />
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Vous travaillez en bureau et vous aimez être toujours bien habillés sans vous ruiner ? Admirez nos pièces uniques et confortables.</p>
                </article>

                {/* Rendu des produits */}
                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
                        bestSeller.map((item,index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} /> 
                        ))
                    }
                </article>
            </section>
        </>
    )
}

export default BestSeller
