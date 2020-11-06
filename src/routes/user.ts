import {Router} from 'express';
import {UserController} from '../controller/UserController';
import { User } from '../entity/User';
import { userInfo } from 'os';
import {checkJwt} from '../middleware/jwt';
import {checkRole} from '../middleware/role';

const router = Router();

// GET all users
router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

// GET one user
router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);

// Create new user
router.post('/add', [checkJwt, checkRole(['admin'])], UserController.newUser);

// Update user
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser);

//Delete user
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.deleteUser);


export default router;





