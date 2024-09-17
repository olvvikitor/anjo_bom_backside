
import loginRouter from '@modules/donor/routes/login_router';
import personRouter from '@modules/donor/routes/person_router';
import { Router } from 'express';

import eventoRouter from '@modules/eventos/routes/eventoRouter';
import donatesRouter from '@modules/donates/routes/donatesRouter';
import loginAdministratorRouter from '@modules/administrator/infra/http/routes/login_router';
import adminRouter from '@modules/administrator/infra/http/routes/admin_router';

export const routes = Router();

routes.use('/person', personRouter);

routes.use('/person/auth', loginRouter)

routes.use('/person/payment', donatesRouter)

routes.use('/admin/auth', loginAdministratorRouter)

routes. use('/events', eventoRouter)

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
