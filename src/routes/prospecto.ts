import {Router} from 'express';
import {ProspectoController} from '../controller/ProspectoController';
import { Prospecto } from '../entity/Prospecto';

const router = Router();

// GET all prospectos
router.get('/',  ProspectoController.getAll);

// GET prospecto
router.get('/:id',  ProspectoController.getById);

// Create nuevo prospecto
router.post('/add',  ProspectoController.newProspecto);

// Update prospecto
router.patch('/:id', ProspectoController.editProspecto);

//Delete prospectp
router.delete('/:id', ProspectoController.deleteProspecto);


export default router;





