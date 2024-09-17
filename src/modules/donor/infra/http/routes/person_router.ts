import { Router } from 'express';
import PersonController from '../controllers/PersonController';
import { celebrate, Joi, Segments } from 'celebrate';
const personRouter = Router();
const personController = new PersonController();


personRouter.post('/',celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    motivation: Joi.string().required(),
    address: Joi.object().keys({
      cep: Joi.string(),
      estado: Joi.string().required().max(2),
      cidade: Joi.string().required(),
      bairro: Joi.string().required(),
      rua: Joi.string().required(),
      numero: Joi.string().required()
    }),
  }
  
}), personController.createPerson);

export default personRouter;
