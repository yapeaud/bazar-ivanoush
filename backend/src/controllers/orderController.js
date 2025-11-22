import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Passer des commandes eu utilsant la méthode COD 
const placeOrder = async (req, res) => {
    try {
        // Récupérer les infos de la commande depuis req.body
        const {items, amount, address} = req.body;

        // Récupérer l'ID de l'utilisateur connecté
        const userId = req.user._id;

         // Créer l'objet commande
        const orderData = {
            userId, 
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        // Enregistrer la commande dans la base de données
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        //Réinitialiser le panier de l'utilisateur
        await userModel.findOneAndUpdate({ _id: userId }, { cartData: {} });

        res.status(200).json({success: true, message: "Commande passée"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

//Passer des commandes eu utilsant la méthode Stripe
const placeOrderStripe = async (req, res) => {}

//Passer des commandes en utilisant la méthode Razorpay
const placeOrderRazorpay = async (req, res) => {}

//Toutes les données relatives aux commandes pour le panneau d'administration
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

//Données de commandes utilisateur pour le Frontend
const getUserOrders = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur connecté
        const userId = req.user._id;

         // Recherche des commandes de l'utilisateur
        const orders = await orderModel.find({userId});
        res.status(200).json({success: true, orders});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

//Mettre à jour le statut de la commande dans le panneau d'administration
const updateOrderStatus = async (req, res) => {}


export default { placeOrder, placeOrderStripe, placeOrderRazorpay, getAllOrders, getUserOrders, updateOrderStatus };