import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const ProductPage = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {

        products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0]); 
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products])

    return productData ? (
        <>
            <section className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
                {/* -------- Données relatives au produit --------  */}
                <article className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

                    {/* --------- Images du produit --------- */}
                    <aside className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                            {
                                productData.image.map((item, index) => (
                                    <img src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={() => setImage(item)} />
                                ))
                            }
                        </div>
                        <div className='w-full sm:w-[80%]'>
                            <img src={image} alt="" className='w-full h-auto' />
                        </div>
                    </aside>
                    {/* -------- Informations sur le produit --------  */}
                    <aside className='flex-1'>
                        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                        <div className='flex items-center gap-1 mt-2'>
                            <img src={assets.star_icon} alt="" className="w-3 5" />
                            <img src={assets.star_icon} alt="" className="w-3 5" />
                            <img src={assets.star_icon} alt="" className="w-3 5" />
                            <img src={assets.star_icon} alt="" className="w-3 5" />
                            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                            <p className='pl-2'>(122)</p>
                        </div>
                        <p className='mt-5 text-3xl font-medium'>{productData.price} {currency}</p>
                        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                        <div className='flex flex-col gap-4 my-8'>
                            <p>Sélectionnez la taille</p>
                            <div className='flex gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <button key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''} `} onClick={() => setSize(item)}>{item}</button>
                                ))}
                            </div>
                        </div>
                        <button className='border py-3 px-8 bg-black text-white text-sm active:bg-gray-700' onClick={() => addToCart(productData._id, size)}>Ajouter au panier</button>
                        <hr className='mt-8 sm:w-4/5' />
                        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                            <p>Produit 100% original.</p>
                            <p>Le paiement à la livraison est disponible pour ce produit.</p>
                            <p>Politique de retour et d'échange facile dans les 7 jours.</p>
                        </div>
                    </aside>
                </article>
            {/* ----------- Section Description & Avis ----------- */}
                <article className='mt-20'>
                    <div className='flex'>
                        <b className='border px-5 py-3 text-sm'>Description</b>
                        <p className='border px-5 py-3 text-sm'>Avis (122)</p>
                    </div>
                    <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                        <p>Un site web de commerce électronique est une plateforme en ligne qui facilite l'achat et la vente de produits ou de services sur Internet. Il sert de marché virtuel où les entreprises et les particuliers peuvent présenter leurs produits, interagir avec les clients et effectuer des transactions sans avoir besoin d'être physiquement présents. Les sites web de commerce électronique ont acquis une immense popularité en raison de leur commodité, de leur accessibilité et de leur portée mondiale.</p>
                        <p>Les sites Web de commerce électronique affichent généralement les produits ou services accompagnés de descriptions détaillées, d'images, de prix et de toutes les variantes disponibles (par exemple, tailles, couleurs). Chaque produit dispose généralement de sa propre page dédiée contenant les informations pertinentes.</p>
                    </div>
                </article>
                {/* ---------- Afficher les produits similaires ---------- */}
                <RelatedProducts selectedCategories={productData.category} selectedTypes={productData.subCategory} />
            </section>
        </>
    ) : <section className='opacity-0'></section>
}

export default ProductPage 