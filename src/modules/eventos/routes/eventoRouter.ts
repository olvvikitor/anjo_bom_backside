import { Router } from 'express';
import EventController  from '../controllers/EventController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer'
import upload from '@config/upload';
import { auth } from '@shared/http/middleweres/auth';



const eventoRouter = Router();
const eventoController = new EventController();

eventoRouter.get('/',eventoController.getEvents )

export default eventoRouter;

/**
 * @swagger
 * /events/:
 *   post:
 *     summary: Cria um novo evento
 *     description: Cria um novo evento com título, descrição, endereço, datas e fotos associadas. Requer autenticação Bearer token.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: O título do evento.
 *                 example: Meu Evento
 *               descricao:
 *                 type: string
 *                 description: A descrição do evento.
 *                 example: Este é um evento incrível
 *               address:
 *                 type: string
 *                 description: O endereço do evento no formato JSON string.
 *                 example: '{"cep": "12345-678", "estado": "SP", "cidade": "São Paulo", "bairro": "Centro", "rua": "Avenida Paulista", "numero": "1000"}'
 *               data_inicio:
 *                 type: string
 *                 format: date-time
 *                 description: Data de início do evento no formato ISO.
 *                 example: 2024-09-01T10:00:00
 *               data_fim:
 *                 type: string
 *                 format: date-time
 *                 description: Data de fim do evento no formato ISO.
 *                 example: 2024-09-01T18:00:00
 *               photos_event:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Arquivos de fotos associados ao evento.
 *     responses:
 *       201:
 *         description: Evento criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: O ID do evento criado.
 *                 titulo:
 *                   type: string
 *                   description: O título do evento.
 *                 descricao:
 *                   type: string
 *                   description: A descrição do evento.
 *                 address:
 *                   type: object
 *                   description: O endereço do evento.
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
 *                 data_inicio:
 *                   type: string
 *                   format: date-time
 *                   description: Data de início do evento.
 *                 data_fim:
 *                   type: string
 *                   format: date-time
 *                   description: Data de fim do evento.
 *       400:
 *         description: Erro na validação dos dados.
 *       401:
 *         description: Não autorizado, token de autenticação inválido ou ausente.
 *       500:
 *         description: Erro interno no servidor.
 */
