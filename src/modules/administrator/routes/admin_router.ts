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

    },
  }),
  adminController.createAdministrator
);
/**
 * @swagger
 * /admin/:
 *   post:
 *     summary: Cria um novo administrador
 *     description: Endpoint para criar um novo administrador no sistema. Requer autenticação.
 *     security:
 *       - apiAuth: []
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
 *         description: Não autorizado, autenticação falhou.
 *       500:
 *         description: Erro interno do servidor.
 */

export default adminRouter;
