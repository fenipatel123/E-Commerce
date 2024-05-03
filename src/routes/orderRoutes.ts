import express from 'express';
import { placeOrder, getOrderHistory,updateOrderStatus,listAllOrders} from '../controllers/order';
import {userauth} from '../middleware/userAuth'
import {auth} from '../middleware/isAdminAuth'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints related to placing orders
 */

/**
 * @swagger
 * /api/v1/placeOrder:
 *   post:
 *     summary: Place an order
 *     description: Place a new order with the items in the user's shopping cart.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */

router.post('/placeOrder', userauth,placeOrder);

/**
 * @swagger
 * /api/v1/getOrderHistory/{id}:
 *   get:
 *     summary: Get order history
 *     description: Retrieve order history for the authenticated user. Optionally, fetch a specific order by ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: ID of the specific order to fetch (optional)
 *         required: false
 *     responses:
 *       '200':
 *         description: Successful operation, returns order(s) based on the query
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '404':
 *         description: Order not found for the user or specified order ID
 *       '500':
 *         description: Internal server error while processing your request
 */



router.get('/getOrderHistory/:id', userauth,getOrderHistory);

/**
 * @swagger
 * /api/v1/getAllOders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders in the system.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation, returns a list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful retrieval of orders
 *                 listCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */




router.get('/getAllOders', auth,listAllOrders);

/**
 * @swagger
 * /api/v1/updateOrderStatus/{id}:
 *   patch:
 *     summary: Update order status
 *     description: Update the status of a specific order by ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '400':
 *         description: Bad request - Missing or invalid status in the request body
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error while processing your request
 */



router.patch('/updateOrderStatus/:id', auth,updateOrderStatus);




export default router;
