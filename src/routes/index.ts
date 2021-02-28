import { Router } from 'express';
import clientsRouter from './clients.routes';
import projectFilesRouter from './projectFiles.routes';
import projectsRouter from './projects.routes';
import projectTypesRouter from './projectTypes.routes';
import rolesRouter from './roles.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/roles', rolesRouter);
routes.use('/clients', clientsRouter);
routes.use('/project-types', projectTypesRouter);
routes.use('/projects', projectsRouter);
routes.use('/project-files', projectFilesRouter);

export default routes;
