import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

/**
 * @swagger
 * /produtos:
 *    get:
 *     summary: Retorna a lista de categorias
 *     tags: 
 *        - Produtos
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID da categoria
 *                     example: "6719a7cc83a8c0d27a299a58"
 *                   name:
 *                     type: string
 *                     description: Nome da categoria
 *                     example: "Brinquedos"
 *                   requirement:
 *                     type: string
 *                     description: Nível de criticidade ou prioridade da categoria
 *                     example: "MEDIO"
 *                   __v:
 *                     type: integer
 *                     description: Versão do documento no banco de dados
 *                     example: 0
 */
productRouter.get('/', productController.findAll)

export default productRouter;
