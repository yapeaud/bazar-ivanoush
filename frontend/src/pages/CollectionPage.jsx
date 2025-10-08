import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const CollectionPage = () => {

    const { products, search, showSearch,  } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortType, setSortType] = useState('relavent')

    const toggleCategory = (e) => {

        if (selectedCategories.includes(e.target.value)) {
            setSelectedCategories(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSelectedCategories(prev => [...prev, e.target.value]);
        }
    };

    const toggleType = (e) => {

        if (selectedTypes.includes(e.target.value)) {
            setSelectedTypes(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSelectedTypes(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {

        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (selectedCategories.length > 0) {
            productsCopy = productsCopy.filter(item => selectedCategories.includes(item.category));
        }

        if (selectedTypes.length > 0) {
            productsCopy = productsCopy.filter(item => selectedTypes.includes(item.subCategory));
        }

        setFilteredProducts(productsCopy);
    }

    const sortProduct = () => {

        let fpCopy = filteredProducts.slice();

        switch (sortType) {
            case 'low-high': setFilteredProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low': setFilteredProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default: applyFilter();
                break;
        }
    }
        useEffect(() => {
            applyFilter();
        }, [selectedCategories, selectedTypes, search, showSearch]);

        useEffect(() => {
            sortProduct();
        }, [sortType]);

        return (
            <>
                <section className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
                    {/* Options de filtrage */}
                    <aside className='min-w-60'>
                        <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>FILTRES
                            <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
                        </p>
                        {/* Categories de filtrage */}
                        <article className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                            <p className='mb-3 text-sm font-medium'>CATÉGORIES</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                                <p className='flex gap-2'><input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Homme</p>
                                <p className='flex gap-2'><input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Femme</p>
                                <p className='flex gap-2'><input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Enfant</p>
                            </div>
                        </article>
                        {/* Sous-categories de filtrage */}
                        <article className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                            <p className='mb-3 text-sm font-medium'>TYPE</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                                <p className='flex gap-2'><input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleType} />Topwear</p>{/* Chemise / Vêtements de dessus */}
                                <p className='flex gap-2'><input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleType} />Bottomwear</p>{/* Pantalon / Vêtements de bas */}
                                <p className='flex gap-2'><input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleType} />Winterwear</p>{/* Vêtements d'hiver */}
                            </div>
                        </article>
                    </aside>

                    {/* Côté droit */}
                    <aside className='flex-1'>
                        <article className='flex justify-between text-base sm:text-2xl mb-4'>
                            <Title text1={'TOUS'} text2={'COLLECTIONS'} />
                            {/* Tri des produits */}
                            <select className='border-2 border-gray-300 text-sm  px-2' onChange={(e)=>setSortType(e.target.value)}>
                                <option value="relavent">Trier par : Pertinence</option> {/*Trier par : relavent */}
                                <option value="low-high">Trier par : Du plus bas au plus élevé</option> {/*Trier par : low-high */}
                                <option value="high-low">Trier par : Du plus élevé au plus bas</option> {/*Trier par : high-low */}
                            </select>
                        </article>

                        {/* Produits */}
                        <article className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                            {filteredProducts.map((item, index) => (
                                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                            ))}
                        </article>
                    </aside>
                </section>
            </>
        )
    }

export default CollectionPage
