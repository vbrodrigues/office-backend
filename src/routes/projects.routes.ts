import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', projectsController.create);

export default projectsRouter;
