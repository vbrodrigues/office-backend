import { Router } from 'express';
import RolesController from '../controllers/RolesController';

const rolesRouter = Router();

const rolesController = new RolesController();

rolesRouter.post('/', rolesController.create);

export default rolesRouter;
