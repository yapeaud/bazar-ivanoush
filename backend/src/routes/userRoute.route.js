import express from 'express'
import { userLogin, userRegister, adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);
userRouter.post('/admin', adminLogin);

export default userRouter;