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
//JSDOC DA CRIAÇÂO DE UM NOVO DOADOR
/**
 * @swagger
 * /person/:
 *   post:
 *     summary: Criar um participante ou doador
 *     description: Cria um novo participante ou doador e retorna os dados criados.
 *     tags:
 *       - Doadores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do participante ou doador.
 *                 example: João
 *               last_name:
 *                 type: string
 *                 description: Sobrenome do participante ou doador.
 *                 example: Silva
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do participante ou doador.
 *                 example: joao.silva@example.com
 *               phone:
 *                 type: string
 *                 description: Número de telefone do participante ou doador.
 *                 example: +5511999998888
 *               password:
 *                 type: string
 *                 description: Senha para a conta do participante ou doador.
 *                 example: password123
 *               motivation:
 *                 type: string
 *                 description: Motivação para ser um doador.
 *                 example: Quero ajudar pessoas em necessidade.
 *               address:
 *                 type: object
 *                 properties:
 *                   cep:
 *                     type: string
 *                     description: Código postal do endereço.
 *                     example: 12345-678
 *                   estado:
 *                     type: string
 *                     description: Sigla do estado.
 *                     example: SP
 *                   cidade:
 *                     type: string
 *                     description: Cidade do endereço.
 *                     example: São Paulo
 *                   bairro:
 *                     type: string
 *                     description: Bairro do endereço.
 *                     example: Centro
 *                   rua:
 *                     type: string
 *                     description: Rua do endereço.
 *                     example: Avenida Paulista
 *                   numero:
 *                     type: string
 *                     description: Número do endereço.
 *                     example: 100
 *     responses:
 *       200:
 *         description: Criar um novo doador e retornar os dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do participante ou doador criado.
 *                   example: 60d21b4667d0d8992e610c85
 *                 name:
 *                   type: string
 *                   description: Nome do participante ou doador.
 *                   example: João
 *                 last_name:
 *                   type: string
 *                   description: Sobrenome do participante ou doador.
 *                   example: Silva
 *                 email:
 *                   type: string
 *                   description: Endereço de e-mail do participante ou doador.
 *                   example: joao.silva@example.com
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do participante ou doador.
 *                   example: +5511999998888
 *                 motivation:
 *                   type: string
 *                   description: Motivação para ser um doador.
 *                   example: Quero ajudar pessoas em necessidade.
 *                 address:
 *                   type: object
 *                   properties:
 *                     cep:
 *                       type: string
 *                       description: Código postal do endereço.
 *                       example: 12345-678
 *                     estado:
 *                       type: string
 *                       description: Sigla do estado.
 *                       example: SP
 *                     cidade:
 *                       type: string
 *                       description: Cidade do endereço.
 *                       example: São Paulo
 *                     bairro:
 *                       type: string
 *                       description: Bairro do endereço.
 *                       example: Centro
 *                     rua:
 *                       type: string
 *                       description: Rua do endereço.
 *                       example: Avenida Paulista
 *                     numero:
 *                       type: string
 *                       description: Número do endereço.
 *                       example: 100
 *       409:
 *         description: Conflito, pois número de telefone ou e-mail já está cadastrado.
 *       500:
 *         description: Erro interno do servidor.
 */