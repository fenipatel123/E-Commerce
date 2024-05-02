import express from 'express';
import { registerUsers, loginUser} from '../controllers/user';

const router = express.Router();


router.post('/register', registerUsers);

router.post('/login', loginUser);


export default router;
