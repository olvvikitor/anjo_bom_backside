import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LoginController from '../controllers/LoginController';
const loginRouter = Router();
const loginController = new LoginController();


loginRouter.post('/',celebrate({
    [Segments.BODY]:{
    param: Joi.string().required(),
    
  }
}), loginController.login);
loginRouter.post('/code/:id', loginController.checkCode)
export default loginRouter;


//JSDOC GERAR CODE LOGIN DOADOR 
/**
 * @swagger
 * /person/auth/:
 *   post:
 *     summary: Gerar código de autenticação para um usuário.
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
 *                 description: Parâmetro de login, que pode ser um e-mail ou telefone do usuário.
 *                 example: "7598563291"
 *             required:
 *               - param
 *     responses:
 *       200:
 *         description: Código gerado e enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário retornado após a geração e envio do código.
 *                   example: "123456"
 *       400:
 *         description: Parâmetro de login inválido.
 *       401:
 *         description: Credenciais inválidas.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

//JSDOC LOGIN-CODE
/**
 * @swagger
 * /person/auth/code/{id}:
 *   post:
 *     summary: Verificar código de autenticação enviado por SMS.
 *     tags:
 *       - Doadores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para verificar o código.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Código de autenticação enviado para o telefone do usuário.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW15bGUiLCJpZCI6IjY2ZGZjYjVjZWVmYjAxNjE2MzdmOGQyZCIsImlhdCI6MTcyNTk0MzQ1MCwiZXhwIjoxNzI2MTE2MjUwLCJzdWIiOiI2NmRmY2I1Y2VlZmIwMTYxNjM3ZjhkMmQifQ.jg9GvmGEcT6Yp9K7FzwvfLG9v-WWrZ6nMJqS8SSSl2E"
 *             required:
 *               - code
 *     responses:
 *       200:
 *         description: Código verificado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Resultado da verificação do código.
 *                   example: "Código verificado com sucesso."
 *       400:
 *         description: Código inválido ou expirado.
 *       404:
 *         description: ID do usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
