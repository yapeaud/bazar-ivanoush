import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const  [latestProduts, setLatestProduts] = useState([]);

    useEffect(() => {
        setLatestProduts(products.slice(0, 10));
    }, [products]); 

    return (
        <>
            <section className='my-10'>
                <article className='text-center py-8 text-3xl'>
                    <Title text1={'DERNIÈRES'} text2={'COLLECTIONS'} />
                    <p className='w-3/4 m-auto text-xs  sm:text-sm md:text-base text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta doloribus voluptate explicabo vel eius facilis iste laudantium rem.
                    </p>
                </article>

                {/* Rendu des produits */}
                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {latestProduts.map((item,index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))}
                </article>

            </section>
        </>
    )
}

export default LatestCollection