import {Router} from 'express';
import {ProspectoController} from '../controller/ProspectoController';
import { Prospecto } from '../entity/Prospecto';
var multer  = require('multer')
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from 'class-validator';

var storage = multer.diskStorage({
    destination:`src/uploads`,
    filename: function(req, file, callback){
        const filedoc = file.originalname.replace(/\s/g, "-");
        callback(null, filedoc)
    }
});
var upload = multer({storage:storage})

const router = Router();


// GET all prospectos
router.get('/',  ProspectoController.getAll);

// GET prospecto
router.get('/:id',  ProspectoController.getById);

// Create nuevo prospecto

router.post('/add', upload.single('documento'), async (request, response)=>{
    interface MulterRequest extends Request{
        file:any;
    }
    const {name, apellidop, apellidom, calle, numero,colonia, codigopostal, telefono, rfc, documento, observacion} = request.body;
    console.log("la data es:",request.body);
    const documento1 = (request as MulterRequest).file;
    console.log(documento1.path);
    const filefine = documento1.originalname.replace(/\s/g, "-");
    const prospecto = new Prospecto();

        prospecto.name = name;
        prospecto.apellidop = apellidop;
        prospecto.apellidom = apellidom;
        prospecto.calle = calle;
        prospecto.numero = numero;
        prospecto.colonia = colonia;
        prospecto.codigopostal = codigopostal;
        prospecto.telefono = telefono;
        prospecto.rfc = rfc;
        prospecto.documento = filefine;
        prospecto.estatus = "E";
        prospecto.observacion = observacion;

        console.log(prospecto);
    
        // Validación
        const errors = await validate(prospecto,{validationError:{target:false, value:false}});
        if(errors.length>0){
            return response.status(400).json(errors);
        }
    
        const prospectoRepository = getRepository(Prospecto);
        try {
            await prospectoRepository.save(prospecto);
        } catch (e) {
            return response.status(409).json({message: 'RFC ya existe'});
        }

        // Todo salió bien
        response.send('Prospecto creado');
});

// Update prospecto
router.patch('/:id', ProspectoController.editProspecto);

//Delete prospectp
router.delete('/:id', ProspectoController.deleteProspecto);


export default router;





