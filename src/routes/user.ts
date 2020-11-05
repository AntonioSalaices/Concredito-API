import {Router} from 'express';
import {UserController} from '../controller/UserController';
import { User } from '../entity/User';
import { userInfo } from 'os';

const router = Router();

// GET all users
router.get('/', UserController.getAll);

// GET one user
router.get('/:id', UserController.getById);

// Create new user
router.post('/add', UserController.newUser);

// Update user
router.patch('/:id', UserController.editUser);

//Delete user
router.delete('/:id', UserController.deleteUser);


export default router;





