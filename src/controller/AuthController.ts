import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {User} from '../entity/User';

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
        }else{

        }
        res.send(user);
    };


}

export default AuthController;