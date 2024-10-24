import { Router } from 'express';
import { CestaController } from '../controller/CestaController';



const cestaRouter = Router();
const cestaController = new CestaController();

/**
 * @swagger
 * /doador/doarProduto/CriarCesta/6534239abf742dd12b2f1a59:
 *   post:
 *     summary: Criação de uma nova Cesta
 *     description: Endpoint para criar uma nova cesta com itens e associar a uma pessoa através do ID passado como parâmetro.
 *     tags:
 *       - Doador Cesta de doação
 *     parameters:
 *       - in: path
 *         name: person_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pessoa associada à cesta.
 *         example: "6523a4e9f5b36b9f64fabae7"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: Lista de itens da cesta.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nome do item.
 *                       example: "Brinquedos"
 *                     quantity:
 *                       type: number
 *                       description: Quantidade do item.
 *                       example: 2
 *               status:
 *                 type: string
 *                 description: Status da cesta.
 *                 enum: [COLETADO, PENDENTE]
 *                 example: "PENDENTE"
 *     responses:
 *       201:
 *         description: Cesta criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID da cesta criada.
 *                   example: "6523a4e9f5b36b9f64fabae7"
 *                 items:
 *                   type: array
 *                   description: Lista de itens da cesta.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nome do item.
 *                         example: "Brinquedos"
 *                       quantity:
 *                         type: number
 *                         description: Quantidade do item.
 *                         example: 2
 *                 person_id:
 *                   type: string
 *                   description: ID da pessoa associada à cesta.
 *                   example: "6523a4e9f5b36b9f64fabae7"
 *                 status:
 *                   type: string
 *                   description: Status da cesta.
 *                   enum: [COLETADO, PENDENTE]
 *                   example: "PENDENTE"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data de criação da cesta.
 *                   example: "2024-10-01T12:34:56.789Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data de atualização da cesta.
 *                   example: "2024-10-01T12:34:56.789Z"
 *       400:
 *         description: Requisição inválida. Parâmetros obrigatórios ausentes ou inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */
cestaRouter.post('/criarCesta/:person_id', cestaController.createCesta);

export default cestaRouter