import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AdministratorController from '../controllers/AdministratorController';
import { auth } from '@shared/http/middleweres/auth';

const adminRouter = Router();
const adminController = new AdministratorController();



adminRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

  }}),adminController.createAdministrator);

adminRouter.get('/show-all', adminController.showAll);

adminRouter.put('/revogue/:id', adminController.revogueAdmin);

export default adminRouter;





//JSDOC PARA A CRIAÇÂO DE UM NOVO ADMIN
/**
 * @swagger
 * /admin/:
 *   post:
 *     summary: Cria um novo administrador
 *     description: Endpoint para criar um novo administrador no sistema. Requer autenticação com um token Bearer.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do administrador.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do administrador.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Senha do administrador.
 *                 example: Password123
 *               role:
 *                 type: string
 *                 enum: [admin, superadmin]
 *                 description: Papel do administrador.
 *                 example: admin
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do administrador criado.
 *                   example: "605c72ef4f1f4b4d12a2e5f0"
 *                 name:
 *                   type: string
 *                   description: Nome do administrador.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email do administrador.
 *                   example: john.doe@example.com
 *       400:
 *         description: Requisição inválida, parâmetros obrigatórios ausentes ou inválidos.
 *       401:
 *         description: Não autorizado, token de autenticação ausente ou inválido.
 *       500:
 *         description: Erro interno do servidor.
 *     headers:
 *       Authorization:
 *         description: Token JWT necessário para autenticação.
 *         schema:
 *           type: string
 *           example: "Bearer <seu-token-aqui>"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


//JSDOC PARA A CONSULTA DE TODOS OS ADMINIS
/**
     * @swagger
     * /show-all:
     *   get:
     *     summary: Recupera todos os administradores com status ativo
     *     description: Esta rota recupera todos os administradores ativos no sistema. Requer autenticação com um token Bearer.
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Administração
     *     responses:
     *       200:
     *         description: Lista de administradores ativos recuperada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   _id:
     *                     type: string
     *                     description: Identificador único do administrador.
     *                     example: "66dbf6aa5904b4954bddc1b6"
     *                   name:
     *                     type: string
     *                     description: Nome do administrador.
     *                     example: "João Victor"
     *                   email:
     *                     type: string
     *                     format: email
     *                     description: Email do administrador.
     *                     example: "victor@gmail.com"
     *                   isActive:
     *                     type: boolean
     *                     description: Indica se o administrador está ativo.
     *                     example: true
     *                   created_at:
     *                     type: string
     *                     format: date-time
     *                     description: Data e hora em que o administrador foi criado.
     *                     example: "2024-09-07T06:46:02.613Z"
     *                   updated_at:
     *                     type: string
     *                     format: date-time
     *                     description: Data e hora da última atualização do administrador.
     *                     example: "2024-09-07T06:46:02.613Z"
     *                   __v:
     *                     type: integer
     *                     description: Versão do documento no banco de dados.
     *                     example: 0
     *       401:
     *         description: Não autorizado, token de autenticação ausente ou inválido.
     *       500:
     *         description: Erro interno do servidor.
     *     headers:
     *       authorization:
     *         description: Token JWT necessário para autenticação.
     *         schema:
     *           type: string
     *           example: "Bearer <seu-token-aqui>"
     */
    
/**
     * @swagger
     * components:
     *   securitySchemes:
     *     BearerAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     */