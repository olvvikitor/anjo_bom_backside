import { Router } from 'express';
import PersonController from '../controllers/PersonController';
import { celebrate, Joi, Segments } from 'celebrate';

const personRouter = Router();
const personController = new PersonController();

//JSDOC PARA CRIAÇÂO DE UM NOVO USUÁRIO
/**
 * @swagger
 * /doador/:
 *   post:
 *     summary: Cria uma nova pessoa.
 *     description: Registra uma nova pessoa com os dados fornecidos.
 *     tags:
 *       - Doador
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
 *  /doador/codigo/:
 *   get:
 *     summary: Gera um código para validação antes da criação de um doador.
 *     description: Retorna um código de validação para o usuário.
 *     tags:
 *       - Doador
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: O número de telefone a ser enviado o código.
 *     responses:
 *       200:
 *         description: Código gerado com sucesso.
 *       404:
 *         description: Código não encontrado.
 */
personRouter.get('/code/:phone', personController.generateCode);

//VERIFICAÇÃO DA EXISTENCIA DE UM NUMERO E GERAÇÂO DE CODIGO PARA AUTENTICAR
/**
 * @swagger
 * /doador/verificaNumero/{phone}:
 *   get:
 *     summary: Verifica se o número de telefone já está cadastrado e gera um código de autenticação.
 *     description: Verifica se o número de telefone informado já está registrado no sistema e, caso positivo, gera um código de autenticação para ser enviado ao usuário.
 *     tags:
 *       - Doador
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: O número de telefone a ser verificado.
 *     responses:
 *       200:
 *         description: Retorna um booleano indicando se o número de telefone já existe e gera o código de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Código de autenticação gerado para o telefone.
 *                   example: "1234"
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro interno no servidor.
 */
personRouter.get('/verificaNumero/:phone', personController.checkPhoneExist);

//VERIFICA SE O CODIGO ENVIADO PELO O USUARIO CORRESPONDE AO TELEFONE RETORNANDO OS DADOS DE ENDEREÇO
/**
 * @swagger
 * /doador/sucesso/{phone}:
 *   post:
 *     summary: Autentica o usuário com o código e retorna os dados do endereço associado.
 *     description: Verifica o código de autenticação enviado pelo usuário e retorna os dados do usuário autenticado, incluindo o endereço associado ao telefone.
 *     tags:
 *       - Doador
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: O número de telefone do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código de autenticação recebido pelo usuário.
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Retorna os dados do usuário autenticado, incluindo nome, email e endereço.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do usuário.
 *                 address:
 *                   type: object
 *                   description: Endereço associado ao usuário.
 *                   properties:
 *                     cep:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     rua:
 *                       type: string
 *                     numero:
 *                       type: string
 *       400:
 *         description: Código de autenticação inválido ou telefone não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */
personRouter.post('/sucesso/:phone', personController.getDonor);
export default personRouter;
