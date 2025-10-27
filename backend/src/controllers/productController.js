import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js'



//Fonction pour ajouter un produit
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        //Gestion des fichiers
        const image1 = req.files?.image1?.[0] || null;
        const image2 = req.files?.image2?.[0] || null;
        const image3 = req.files?.image3?.[0] || null;
        const image4 = req.files?.image4?.[0] || null;

        const images = [image1, image2, image3, image4].filter((item) => item !== null);

        // Upload vers Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()


        res.status(200).json({ success: true, message: 'Produit ajouté' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}

//Fonction pour la liste des produits
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}

//Fonction permettant de retirer un produit
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Produit supprimé' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}

//Fonction pour les informations sur un seul produit
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId);
        res.status(200).json({ success: true, data: product })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }