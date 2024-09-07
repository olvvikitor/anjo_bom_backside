
import loginRouter from '@modules/donor/routes/login_router';
import personRouter from '@modules/donor/routes/person_router';
import { Router } from 'express';

export const routes = Router();

routes.use('/person', personRouter);
routes.use('/auth', loginRouter)


 export default routes;