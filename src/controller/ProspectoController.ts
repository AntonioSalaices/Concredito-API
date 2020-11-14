import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Prospecto} from "../entity/Prospecto";
import * as fileUpload from "express-fileupload";
import {validate} from 'class-validator';


export class ProspectoController {


    // Servicio para obtener todos los prospectos
    static getAll = async (req:Request, res:Response)=>{

        const prospectoRepository = getRepository(Prospecto);
        try {
            const prospectos = await prospectoRepository.find();
            res.send(prospectos);             
        } catch (e) {
            res.status(404).json({message:'No hay prospectos registrados'});            
        }
    };
    

    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const prospectoRepository = getRepository(Prospecto);
        
        try {
            const prospecto = await prospectoRepository.findOneOrFail(id);
            res.send(prospecto);        
        } catch (e) {
            res.status(404).json({message:'No encontrado'});            
        }
    };

    
    

    static editProspecto = async (req:Request, res:Response)=>{
        let prospecto;
        const {id} = req.params;
        const {estatus, observacion} = req.body;
        const prospectoRepository = getRepository(Prospecto);
        
        try {
            prospecto = await prospectoRepository.findOneOrFail(id); 
            prospecto.estatus = estatus;
            prospecto.observacion = observacion;       
        } catch (e) {
            res.status(404).json({message:'Prospecto no encontrado'});            
        }

        

        const errors = await validate(prospecto,{validationError:{target:false, value:false}});
        if(errors.length){
            return res.status(400).json(errors);
        }

        try {
            await prospectoRepository.save(prospecto);
        } catch (e) {
            return res.status(409).json({message: 'Hubo un problema al actualizar'});
        }

        // Todoo bien
        res.status(201).send('Prospecto actualizado');
    };

    static deleteProspecto = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const prospectoRepository = getRepository(Prospecto);
        let prospecto = Prospecto;
        
        try {
            const prospecto = await prospectoRepository.findOneOrFail(id);  
        } catch (e) {
            res.status(404).json({message:'No encontrado'});            
        }
        // Eliminando prospecto
        prospectoRepository.delete(id); 
        res.status(201).json({message:'Prospecto eliminado'});  

    };

   

}

export default ProspectoController;