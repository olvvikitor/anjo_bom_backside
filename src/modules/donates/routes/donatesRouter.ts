import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import DonatesController from '@modules/donates/controllers/DonatesController';

const donatesRouter = Router();
const donatesController = new DonatesController();

/**
 * @swagger
 * /donates:
 *   post:
 *     summary: Realiza uma doação via Pix.
 *     description: Cria uma nova transação Pix com os dados fornecidos.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Payment
 *     requestBody:
 *       description: Dados necessários para realizar a doação via Pix.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.00
 *               email:
 *                 type: string
 *                 example: example@example.com
 *               name:
 *                 type: string
 *                 example: João Silva
 *               phone:
 *                 type: string
 *                 example: +5511999999999
 *               message:
 *                 type: string
 *                 example: Doação para a causa X
 *       required:
 *         - amount
 *         - email
 *     responses:
 *       200:
 *         description: Doação realizada com sucesso. Retorna a URL do ticket para a transação Pix.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket_url:
 *                   type: string
 *                   example: "https://www.mercadopago.com.br/payments/87843453574/ticket?caller_id=1991059032&hash=157d4f05-e4a0-4dab-9dd5-ec065e4ba752"
 *       400:
 *         description: Parâmetros inválidos fornecidos na requisição.
 *       401:
 *         description: Não autorizado.
 */
donatesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().required(),
      email: Joi.string().lowercase().email().required(),
      name: Joi.string().optional(),
      phone: Joi.string().optional(),
      message: Joi.string().optional(),
    },
  }),
  donatesController.donateWithPix
);

/**
 * @swagger
 * /donates/{id}:
 *   put:
 *     summary: Atualiza informações de uma doação existente.
 *     description: Atualiza os detalhes de uma doação via Pix com base no ID fornecido.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Payment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identificador da doação a ser atualizada.
 *         schema:
 *           type: string
 *           example: 607f1f77bcf86cd799439011
 *     requestBody:
 *       description: Dados atualizados para a doação.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 150.00
 *               email:
 *                 type: string
 *                 example: example@updated.com
 *               name:
 *                 type: string
 *                 example: João Silva Atualizado
 *               phone:
 *                 type: string
 *                 example: +5511988888888
 *               message:
 *                 type: string
 *                 example: Atualização da doação
 *     responses:
 *       200:
 *         description: Informações da doação atualizadas com sucesso.
 *       400:
 *         description: Parâmetros inválidos fornecidos na requisição.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Doação não encontrada.
 */
donatesRouter.put('/:id', donatesController.updateInfoPix);

export default donatesRouter;
