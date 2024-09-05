import donorRouter from '@modules/donor/routes/donor_router';
import { Router } from 'express';

export const routes = Router();

routes.use('/donor', donorRouter);



 export default routes;