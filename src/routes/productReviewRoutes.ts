import express from 'express';
import { addProductReview} from '../controllers/productReview';
import { userauth } from '../middleware/userAuth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProductReview
 *   description: API endpoints related to product review
 */

/**
 * @swagger
 * /api/v1/addProductReview:
 *   post:
 *     summary: Add a product review
 *     description: Add a new review for a product. If the user has already reviewed the product, it returns an error.
 *     tags: [ProductReview]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to review
 *               rating:
 *                 type: number
 *                 description: Rating given by the user (1 to 5 stars)
 *             required:
 *               - productId
 *               - rating
 *           example:
 *             productId: "60a5b1fae5f3d441288433e5"
 *             rating: 4
 *     responses:
 *       '201':
 *         description: Product review added successfully
 *       '400':
 *         description: Bad request - User has already reviewed this product
 *       '500':
 *         description: Internal server error
 */



router.post('/addProductReview',userauth ,addProductReview);


export default router;
