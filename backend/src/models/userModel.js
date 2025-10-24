import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {types: String, required: true},
    email: {types: String, required: true, unique: true},
    password: {types: String, required: true},
    cartData: {types:Object, default: {}}
},{minimize: false})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel