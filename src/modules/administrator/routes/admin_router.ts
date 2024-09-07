import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AdministratorController from '../controllers/AdministratorController';
import { auth } from '@shared/http/middleweres/auth';
const adminRouter = Router();
const adminController = new AdministratorController();
adminRouter.use(auth)
adminRouter.post('/', adminController.createAdministrator);

export default adminRouter;