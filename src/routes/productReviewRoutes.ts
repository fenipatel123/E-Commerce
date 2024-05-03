import express from 'express';
import { addProductReview} from '../controllers/productReview';
import { userauth } from '../middleware/userAuth';

const router = express.Router();


router.post('/addProductReview',userauth ,addProductReview);


export default router;
