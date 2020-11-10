import {Router} from 'express';


import prospecto from './prospecto';

const routes =  Router();

routes.use('/prospectos', prospecto);


export default routes;


