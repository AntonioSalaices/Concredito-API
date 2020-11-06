import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";

import {validate, Validate} from 'class-validator';

export class UserController {

    static getAll = async (req:Request, res:Response)=>{

        const userRepository = getRepository(User);
        try {
            const users = await userRepository.find();
            res.send(users);             
        } catch (e) {
            res.status(404).json({message:'Not found'});            
        }
    };
    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(User);
        
        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);        
        } catch (e) {
            res.status(404).json({message:'No encontrado'});            
        }
    };

    static newUser = async (req:Request, res:Response)=>{
        const {username, password, role} = req.body;

        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        // Validate
        const errors = await validate(user);
        if(errors.length>0){
            return res.status(400).json(errors);
        }
        // TODO HASH PASSWORD
        const userRepository = getRepository(User);
        try {
            user.hashPassword();
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).json({message: 'Username ya existe'});
        }

        // Todoo bien
        res.send('Usuario creado');


        
    };

    static editUser = async (req:Request, res:Response)=>{
        let user;
        const {id} = req.params;
        const {username, role} = req.body;
        const userRepository = getRepository(User);
        
        try {
            user = await userRepository.findOneOrFail(id); 
            user.username = username;
            user.role = role;       
        } catch (e) {
            res.status(404).json({message:'Usuario no encontrado'});            
        }

        

        const errors = await validate(user);
        if(errors.length){
            return res.status(400).json(errors);
        }

        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).json({message: 'Username ya existe'});
        }

        // Todoo bien
        res.status(201).send('Usuario actualizado');
    };

    static deleteUser = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user = User;
        
        try {
            const user = await userRepository.findOneOrFail(id);  
        } catch (e) {
            res.status(404).json({message:'No result'});            
        }
        // Eliminando usuario
        userRepository.delete(id); 
        res.status(201).json({message:'Usuario eliminado'});  

    };

   

}

export default UserController;