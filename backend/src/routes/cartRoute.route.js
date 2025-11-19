import express from 'express';
import cartController from '../controllers/cartController.js';
import authUser from '../middleware/authUser.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser, cartController.addToCart);
cartRouter.post('/update',authUser, cartController.updateCart);
cartRouter.post('/get',authUser, cartController.getUserCart);

export default cartRouter;