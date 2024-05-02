import express from 'express';
import {addProduct,updateProduct,deleteProducts,getAllProducts,listProductWithPagination, getAllProductsWithFilters,getProductById } from '../controllers/product';
import {auth} from '../middleware/isAdminAuth'
import {userauth} from '../middleware/userAuth'


const router = express.Router();

router.post('/addProduct',auth ,addProduct);

router.patch('/updateProduct/:id',auth ,updateProduct);

router.delete('/deleteProducts/:id',auth ,deleteProducts);

router.get('/getAllProducts',userauth ,getAllProducts);

router.get('/getAllProductsPagination',userauth ,listProductWithPagination);

router.get('/getAllProductsFilters',userauth,getAllProductsWithFilters);

router.get('/getProductById/:id',userauth,getProductById);




export default router;
