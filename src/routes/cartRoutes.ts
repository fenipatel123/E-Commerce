import express from 'express';
import { addToCart, updateCart, removeFromCart} from '../controllers/cart';
import {userauth} from '../middleware/userAuth'

const router = express.Router();

router.post('/addToCart', userauth,addToCart);


router.patch('/updateCart', userauth,updateCart);


router.delete('/removeFromCart', userauth,removeFromCart);



export default router;
