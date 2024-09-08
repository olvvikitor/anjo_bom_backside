
import adminRouter from '@modules/administrator/routes/admin_router';
import loginAdministratorRouter from '@modules/administrator/routes/login_router';
import loginRouter from '@modules/donor/routes/login_router';
import personRouter from '@modules/donor/routes/person_router';
import { Router } from 'express';
import { auth } from '../middleweres/auth';

export const routes = Router();

routes.use('/person', personRouter);
routes.use('/person/auth', loginRouter)

routes.use('/admin/auth', loginAdministratorRouter)

routes.use('/admin', auth ,adminRouter);

 export default routes;
 /**
  * @swagger
  * components:
  *     securitySchemes:
  *       apiAuth:
  *         type: apiKey
  *         in: header
  *         name: token
  */

