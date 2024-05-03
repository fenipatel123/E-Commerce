import express from 'express';
import { registerUsers, loginUser} from '../controllers/user';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints related to user operations
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:  # Add the profile object here
 *                 type: object
 *                 properties:
 *                   age:
 *                     type: integer
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request - user with this email already exists
 *       '500':
 *         description: Internal server error while processing your request!
 */

router.post('/register', registerUsers);


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login as a user
 *     description: Log in using user credentials to access user functionalities.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *       '404':
 *         description:  User data does not exists!
 *       '401':
 *         description: Invalid username and password
 *       '500':
 *         description: Internal server error while processing your request!
 */

router.post('/login', loginUser);


export default router;
