import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AdministratorController from '../controllers/AdministratorController';
import LoginAdministratorController from '../controllers/LoginAdminController';
const loginAdministratorRouter = Router();
const loginAdministratorController = new LoginAdministratorController();

loginAdministratorRouter.post('/', loginAdministratorController.loginAdmin);

export default loginAdministratorRouter;