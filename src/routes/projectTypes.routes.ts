import { Router } from 'express';
import ProjectTypesController from '../controllers/ProjectTypesController';

const projectTypesRouter = Router();

const projectTypesController = new ProjectTypesController();

projectTypesRouter.post('/', projectTypesController.create);

export default projectTypesRouter;
