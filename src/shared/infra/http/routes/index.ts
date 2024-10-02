

import { Router } from 'express';

import loginAdministratorRouter from '@modules/administrator/infra/http/routes/login_router';
import adminRouter from '@modules/administrator/infra/http/routes/admin_router';
import donatesRouter from '@modules/donates/infra/http/routes/donatesRouter';
import personRouter from '@modules/donor/infra/http/routes/person_router';
import eventoRouter from '@modules/eventos/infra/http/routes/eventoRouter';
import cestaRouter from '@modules/donateProduct/infra/http/routes/cestaRouter';

export const routes = Router();

routes.use('/person', personRouter);

routes.use('/person/donate/payment', donatesRouter)

routes.use('/person/donate', cestaRouter)

routes.use('/admin/auth', loginAdministratorRouter)

routes.use('/admin' ,adminRouter);

routes. use('/events', eventoRouter)





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
