import { Router } from 'express';
import DonorController from '../controllers/DonorController';
const donorRouter = Router();
const donorController = new DonorController();


donorRouter.post('/', donorController.createDonor);
donorRouter.get('/findEmail', donorController.findByEmail)

export default donorRouter;