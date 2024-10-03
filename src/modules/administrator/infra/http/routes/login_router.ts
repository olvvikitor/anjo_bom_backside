import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LoginAdministratorController from '../controllers/LoginAdminController';


const loginAdministratorRouter = Router();
const loginAdministratorController = new LoginAdministratorController();
//JSDOC PARA O LOGIN DE UM ADMIN
/**
 * @swagger
 *  /admin/auth:
 *   post:
 *     summary: Login de administrador
 *     description: Endpoint para login de administradores. Retorna um token JWT se as credenciais estiverem corretas.
 *     tags:
 *       - Administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do administrador.
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Senha do administrador.
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado para o administrador.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjA1YjViNTY1Mzc1MzEwMTE2NjM4N2EzIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjkwNzM0MTMyLCJleHBpcmF0aW9uIjoiMjAyMy0wOC0yMiJ9.KoWQkx07s-7A0v2Y8LxPvlNuFCRj-9i4kpydC-lQThg"
 *       400:
 *         description: Requisição inválida, parâmetros obrigatórios ausentes ou inválidos.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
loginAdministratorRouter.post(
  '/a',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  loginAdministratorController.loginAdmin
);

export default loginAdministratorRouter;
