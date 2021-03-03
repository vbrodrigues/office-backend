import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', projectsController.create);
projectsRouter.get('/', projectsController.show);
projectsRouter.get('/:project_id', projectsController.index);
projectsRouter.delete('/:project_id', projectsController.delete);

export default projectsRouter;
