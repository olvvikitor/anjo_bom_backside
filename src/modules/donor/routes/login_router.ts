import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LoginController from '../controllers/LoginController';
const loginRouter = Router();
const loginController = new LoginController();


loginRouter.post('/',celebrate({
  [Segments.BODY]:{
    param: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }
}), loginController.login);

export default loginRouter;