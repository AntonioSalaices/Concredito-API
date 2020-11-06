import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import {validate, Validate} from 'class-validator';
class AuthController{
    static login = async (req: Request,res: Response) =>{
        const {username, password} = req.body;
        if(!(username && password)){
            return res.status(400).json({message:'Username y password requerido!'});
        }
        const userRepository = getRepository(User);
        let user: User;
        try{
            user = await userRepository.findOneOrFail({where:{username}});
        }catch(error){
            return res.status(400).json({message:'Username o password no encontrado!'});
        }
        // Checar password
        if(!user.checkPassword(password)){
            return res.status(400).json({message:'Usuario o password son incorrectos'});
        }

        const token = jwt.sign({userId:user.id, username:user.username}, config.jwtSecret, {expiresIn:'1h'});
        res.json({message:'OK', token});
    };

    static changePassword = async (req: Request,res: Response) =>{
        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;

        if(!(oldPassword && newPassword)){
            return res.status(400).json({message:'Password anterior y password nueva es requerido!'});
        }

        const userRepository = getRepository(User);
        let user: User;
        try{
            user = await userRepository.findOneOrFail(userId);
        }catch(error){
            return res.status(400).json({message:'Algo ha ido mal!'});
        }
        // Checar password
        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message:'Verifica tu password antiguo'});
        }
        user.password = newPassword;
        const errors = await validate(user,{validationError:{target:false, value:false}});
        if(errors.length){
            return res.status(400).json(errors);
        }
        user.hashPassword();
        userRepository.save(user);

        res.json({message:'Password cambiado'});
        
    };

}

export default AuthController;