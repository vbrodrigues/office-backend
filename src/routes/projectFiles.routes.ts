import { Router } from 'express';
import ProjectFilesController from '../controllers/ProjectFilesController';

const projectFilesRouter = Router();

const projectFilesController = new ProjectFilesController();

projectFilesRouter.post('/', projectFilesController.create);

export default projectFilesRouter;
