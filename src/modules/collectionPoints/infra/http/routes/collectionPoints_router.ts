import { Router } from 'express';
import CollectionPointController from '../controllers/CollectionPointController';
const collectionPointsRouter = Router();
const collectionPointController = new CollectionPointController();

//JSDOC PARA A EXIBIÇÃO DE TODOS OS PONTOS DE COLETA
/**
 * @swagger
 *  /coletas/buscarPontosDeColeta:
 *   get:
 *     summary: Exibe todos os pontos de coleta
 *     description: Recupera uma lista de todos os pontos de coleta.
 *     tags:
 *       - Doador Pontos De Coleta
 *     responses:
 *       200:
 *         description: Lista de todos os pontos de coleta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                   type: string
 *                   description: Nome do local
 *                  address:
 *                    type: object
 *                    properties:
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
 *       500:
 *         description: Erro interno no servidor.
 */
collectionPointsRouter.get('/buscarPontosDeColeta', collectionPointController.getAllCollectionPoints);
export default collectionPointsRouter