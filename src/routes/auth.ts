import {Router} from 'express';

import AuthController from '../controller/AuthController';
import {checkJwt} from '../middleware/jwt';

const router = Router();

// Login
router.post('/login', AuthController.login);


// change password
router.post('/change-password',[checkJwt], AuthController.changePassword);


export default router;