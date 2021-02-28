import { Router } from 'express';
import SchedulesController from '../controllers/SchedulesController';

const schedulesRouter = Router();

const schedulesController = new SchedulesController();

schedulesRouter.post('/', schedulesController.create);

export default schedulesRouter;
