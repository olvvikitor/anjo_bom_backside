

import { Router } from 'express';

import loginAdministratorRouter from '@modules/administrator/infra/http/routes/login_router';
import adminRouter from '@modules/administrator/infra/http/routes/admin_router';
import donatesRouter from '@modules/donates/infra/http/routes/donatesRouter';
import loginRouter from '@modules/donor/infra/http/routes/login_router';
import personRouter from '@modules/donor/infra/http/routes/person_router';
import eventoRouter from '@modules/eventos/infra/http/routes/eventoRouter';

export const routes = Router();

routes.use('/person', personRouter);

routes.use('/person/auth', loginRouter)

routes.use('/person/payment', donatesRouter)

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
