import express from 'express';
import {addProduct,updateProduct,deleteProducts,getAllProducts,listProductWithPagination, getAllProductsWithFilters,getProductById } from '../controllers/product';
import {auth} from '../middleware/isAdminAuth'


const router = express.Router();

router.post('/addProduct',auth ,addProduct);

router.patch('/updateProduct/:id',auth ,updateProduct);

router.delete('/deleteProducts/:id',auth ,deleteProducts);

router.get('/getAllProducts',getAllProducts);

router.get('/getAllProductsPagination',listProductWithPagination);

router.get('/getAllProductsFilters',getAllProductsWithFilters);

router.get('/getProductById/:id',getProductById);




export default router;
