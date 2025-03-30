

import { Router } from 'express';

import loginAdministratorRouter from '@modules/administrator/infra/http/routes/login_router';
import adminRouter from '@modules/administrator/infra/http/routes/admin_router';
import donatesRouter from '@modules/donates/infra/http/routes/donatesRouter';
import personRouter from '@modules/donor/infra/http/routes/person_router';
import eventoRouter from '@modules/eventos/infra/http/routes/eventoRouter';
import cestaRouter from '@modules/donateProduct/infra/http/routes/cestaRouter';
import collectionPointsRouter from '@modules/collectionPoints/infra/http/routes/collectionPoints_router';
import productRouter from '@modules/products/infra/http/routes/productRouter';

export const routes = Router();

routes.use('/doador', personRouter);

routes.use('/doador/doarPix', donatesRouter)

routes.use('/doador/doarProduto', cestaRouter)

routes.use('/admin/auth', loginAdministratorRouter)

routes. use('/eventos', eventoRouter)

routes.use('/coletas', collectionPointsRouter)

routes.use('/produtos', productRouter)

routes.use('/admin' ,adminRouter);





 export default routes;
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
