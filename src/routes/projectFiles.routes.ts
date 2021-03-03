import { Router } from 'express';
import ProjectFilesController from '../controllers/ProjectFilesController';

const projectFilesRouter = Router();

const projectFilesController = new ProjectFilesController();

projectFilesRouter.post('/', projectFilesController.create);
projectFilesRouter.get('/', projectFilesController.show);
projectFilesRouter.get('/:project_file_id', projectFilesController.index);
projectFilesRouter.delete('/:project_file_id', projectFilesController.delete);

export default projectFilesRouter;
