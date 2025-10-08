import { useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({selectedCategories, selectedTypes}) => {

    const { products } = useContext(ShopContext);
    const  [related, setRelated] = useState([]);

    useEffect(() =>{

        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => selectedCategories === item.category);
            productsCopy = productsCopy.filter((item) => selectedTypes === item.subCategory);

            setRelated(productsCopy.slice(0,5));
            
        }

    },[products])

    return (
        <>
            <section className='my-24'>
                <article className='text-center text-3xl py-2'>
                    <Title text1={'PRODUITS'} text2={'SIMILAIRES'} />
                </article>
                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {related.map((item,index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))}
                </article>
            </section>
        </>
    )
}

export default RelatedProducts
