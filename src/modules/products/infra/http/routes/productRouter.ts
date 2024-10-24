import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.findAll)

export default productRouter;
