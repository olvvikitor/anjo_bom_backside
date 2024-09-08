import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LoginController from '../controllers/LoginController';
const loginRouter = Router();
const loginController = new LoginController();


loginRouter.post('/',celebrate({
    [Segments.BODY]:{
    param: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }
}), loginController.login);
/**
 * @swagger
 * /person/auth/:
 *   post:
 *     summary: Realizar login de um usuário
 *     tags:
 *       - Doadores
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               param:
 *                 type: string
 *                 description: Parâmetro de login (por exemplo, e-mail ou nome de usuário)
 *                 example: joao.silva@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha1234
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação retornado após login
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

export default loginRouter;