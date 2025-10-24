import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {types: String, required: true},
    description: {types: String, required: true},
    price: {types: Number, required: true},
    image: {types: Array, required: true},
    category: {types: String, required: true},
    subCategory: {types: String, required: true},
    size: {types: Array, required: true},
    bestseller: {types: Boolean},
    date: {types: Number, required: true},
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema)

export default productModel