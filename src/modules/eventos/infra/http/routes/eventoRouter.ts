import { Router } from 'express';
import EventController from '../controllers/EventController';

const eventoRouter = Router();
const eventoController = new EventController();

/**
 * @swagger
 * /eventos/:
 *   get:
 *     summary: Recupera todos os eventos.
 *     description: Retorna uma lista de todos os eventos registrados no sistema. Permite paginação.
 *     tags:
 *       - Evento
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página a ser recuperada (início em 1).
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 2
 *       - in: query
 *         name: perPage
 *         required: false
 *         description: Número máximo de eventos a serem retornados por página.
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 5
 *     responses:
 *       200:
 *         description: Lista de eventos recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: Página atual da lista de eventos.
 *                   example: 2
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas disponíveis.
 *                   example: 5
 *                 totalEvents:
 *                   type: integer
 *                   description: Total de eventos registrados.
 *                   example: 50
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5f4842f8fb63a1c0a6b1f"
 *                       titulo:
 *                         type: string
 *                         example: "Meu Evento"
 *                       descricao:
 *                         type: string
 *                         example: "Este é um evento incrível"
 *                       address:
 *                         type: object
 *                         properties:
 *                           cep:
 *                             type: string
 *                             example: "12345-678"
 *                           estado:
 *                             type: string
 *                             example: "SP"
 *                           cidade:
 *                             type: string
 *                             example: "São Paulo"
 *                           bairro:
 *                             type: string
 *                             example: "Centro"
 *                           rua:
 *                             type: string
 *                             example: "Avenida Paulista"
 *                           numero:
 *                             type: string
 *                             example: "1000"
 *                       data_inicio:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-01T10:00:00Z"
 *                       data_fim:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-01T18:00:00Z"
 *                       photos_event:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "https://example.com/photo1.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-20T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-20T12:00:00Z"
 *       404:
 *         description: Nenhum evento encontrado.
 */
eventoRouter.get('/', eventoController.getEvents);

export default eventoRouter;
