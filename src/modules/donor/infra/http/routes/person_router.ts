import { Router } from 'express';
import PersonController from '../controllers/PersonController';
import { celebrate, Joi, Segments } from 'celebrate';

const personRouter = Router();
const personController = new PersonController();

//JSDOC PARA CRIAÇÂO DE UM NOVO USUÁRIO
/**
 * @swagger
 * http://localhost:5000/person/:
 *   post:
 *     summary: Cria uma nova pessoa.
 *     description: Registra uma nova pessoa com os dados fornecidos.
 *     tags:
 *       - Person
 *     requestBody:
 *       description: Dados necessários para registrar uma nova pessoa.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João
 *               last_name:
 *                 type: string
 *                 example: Silva
 *               email:
 *                 type: string
 *                 example: exemplo@exemplo.com
 *               phone:
 *                 type: string
 *                 example: +5511999999999
 *               motivation:
 *                 type: string
 *                 example: Ajuda em causas sociais
 *               address:
 *                 type: object
 *                 properties:
 *                   cep:
 *                     type: string
 *                     example: 12345-678
 *                   estado:
 *                     type: string
 *                     example: SP
 *                   cidade:
 *                     type: string
 *                     example: São Paulo
 *                   bairro:
 *                     type: string
 *                     example: Centro
 *                   rua:
 *                     type: string
 *                     example: Rua Exemplo
 *                   numero:
 *                     type: string
 *                     example: 123
 *       required:
 *         - name
 *         - last_name
 *         - email
 *         - phone
 *         - motivation
 *         - address
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso.
 *       400:
 *         description: Parâmetros inválidos fornecidos na requisição.
 */
personRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
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
        numero: Joi.string().required(),
      }),
    },
  }),
  personController.createPerson
);
//JSDOC PARA CRIAÇÂO DE CODIGO
/**
 * @swagger
 * http://localhost:5000/person/code/:
 *   get:
 *     summary: Gera um código para validação.
 *     description: Retorna um código de validação para o usuário.
 *     tags:
 *       - Person
 *     responses:
 *       200:
 *         description: Código gerado com sucesso.
 *       404:
 *         description: Código não encontrado.
 */
personRouter.get('/code/', personController.generateCode);

export default personRouter;
