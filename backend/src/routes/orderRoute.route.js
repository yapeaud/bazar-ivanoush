import express from 'express';
import orderController from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

//Fonnction d'accès aux commandes du panneau d'administration
orderRouter.post('/list', adminAuth, orderController.getAllOrders);
orderRouter.post('/status', adminAuth, orderController.updateOrderStatus);

//Fonction de paiement de la commande
orderRouter.post('/place',authUser, orderController.placeOrder);
orderRouter.post('/stripe',authUser, orderController.placeOrderStripe);
orderRouter.post('/razorpay',authUser, orderController.placeOrderRazorpay);

//Fonction d'accès aux commandes de l'utilisateur
orderRouter.post('/userOrders',authUser, orderController.getUserOrders);

export default orderRouter; 