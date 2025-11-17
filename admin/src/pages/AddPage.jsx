import React from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AddPage = ({ token }) => {

    const [image1, setImage1] = React.useState(null)
    const [image2, setImage2] = React.useState(null)
    const [image3, setImage3] = React.useState(null)
    const [image4, setImage4] = React.useState(null)

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("Men");
    const [subCategory, setSubCategory] = React.useState("Topwear");
    const [bestseller, setBestseller] = React.useState(false);
    const [sizes, setSizes] = React.useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!token || typeof token !== 'string') {
            console.error("Le token est invalide ou manquant !", token);
            toast.error("Vous n'êtes pas connecté.");
            return;
        }

        // console.log("Token envoyé:", token); // Debug
        // console.log("Type du token:", typeof token); // Debug

        try {
            const formData = new FormData()

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            // console.log("Envoi des données...", {
            //     name, description, price, category, subCategory, bestseller, sizes
            // });

            const response = await axios.post(
                backendUrl + "/api/products/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {
                toast.success(response.data.message)
                // Réinitialisation complète
                setName('')
                setDescription('')
                setImage1(null)
                setImage2(null)
                setImage3(null)
                setImage4(null)
                setPrice('')
                setCategory("Men")
                setSubCategory("Topwear")
                setBestseller(false)
                setSizes([])
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log("Erreur complète:", error);
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <section>
                <p className='mb-2'>Télécharger une image</p>
                <article className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </article>
            </section>

            <article className='w-full'>
                <p className='mb-2'>Nom du produit</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Écrivez ici' className='w-full max-w-[500px] px-3 py-2 border border-gray-300' required />
            </article>

            <article className='w-full'>
                <p className='mb-2'>Description du produit</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Rédigez le contenu ici' className='w-full max-w-[500px] px-3 py-2 border border-gray-300' required />
            </article>

            <section className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <article>
                    <p className='mb-2'>Catégorie de produits</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                        <option value="Men">Homme</option>
                        <option value="Women">Femme</option>
                    </select>
                </article>

                <article>
                    <p className='mb-2'>Types de produit</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                        <option value="Topwear">Chemise</option>
                        <option value="Bottomwear">Pantalon</option>
                    </select>
                </article>

                <article>
                    <p className='mb-2'>Prix du produit</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='1500' className='w-full px-3 py-2 sm:w-[120px]' />
                </article>
            </section>

            <section>
                <p className='mb-2'>Tailles du produit</p>
                <article className='flex gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </article>
            </section>

            <article className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label htmlFor="bestseller" className='cursor-pointer'>Add to bestseller</label>
            </article>

            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>AJOUTER</button>
        </form>
    )
}

export default AddPage