import { Router } from 'express';
import EventController from '../controllers/EventController';
import { IAddress } from '@modules/address/domain/models/IAddress';

const eventoRouter = Router();
const eventoController = new EventController();

/**
 * @swagger
 * http://localhost:5000/events/:
 *   get:
 *     summary: Recupera todos os eventos.
 *     description: Retorna uma lista de todos os eventos registrados no sistema.
 *     tags:
 *       - Evento
 *     responses:
 *       200:
 *         description: Lista de eventos recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d5f4842f8fb63a1c0a6b1f"
 *                   titulo:
 *                     type: string
 *                     example: "Meu Evento"
 *                   descricao:
 *                     type: string
 *                     example: "Este é um evento incrível"
 *                   address:
 *                     type: object
 *                     properties:
 *                       cep:
 *                         type: string
 *                         example: "12345-678"
 *                       estado:
 *                         type: string
 *                         example: "SP"
 *                       cidade:
 *                         type: string
 *                         example: "São Paulo"
 *                       bairro:
 *                         type: string
 *                         example: "Centro"
 *                       rua:
 *                         type: string
 *                         example: "Avenida Paulista"
 *                       numero:
 *                         type: string
 *                         example: "1000"
 *                   data_inicio:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T10:00:00Z"
 *                   data_fim:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T18:00:00Z"
 *                   photos_event:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "https://example.com/photo1.jpg"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-09-20T12:00:00Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-09-20T12:00:00Z"
 *       404:
 *         description: Nenhum evento encontrado.
 */
eventoRouter.get('/', eventoController.getEvents);

export default eventoRouter;
