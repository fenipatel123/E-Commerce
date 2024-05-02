import express, { Router } from 'express';
import { loginAdminUser } from '../controllers/admin';

const router :Router = express.Router();


router.post('/adminlogin', loginAdminUser);

export default router;
