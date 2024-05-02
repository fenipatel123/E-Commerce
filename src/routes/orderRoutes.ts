import express from 'express';
import { placeOrder, getOrderHistory,updateOrderStatus,listAllOrders} from '../controllers/order';
import {userauth} from '../middleware/userAuth'
import {auth} from '../middleware/isAdminAuth'

const router = express.Router();

router.post('/placeOrder', userauth,placeOrder);

router.get('/getOrderHistory/:id', userauth,getOrderHistory);

router.get('/getAllOders', auth,listAllOrders);


router.patch('/updateOrderStatus/:id', auth,updateOrderStatus);




export default router;
