import express from 'express';
import { registerUser }  from '../controllers/authcontroller';

const router = express.Router();

router.post('/signup', registerUser);

export default router;