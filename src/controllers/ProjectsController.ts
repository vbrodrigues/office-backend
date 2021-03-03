import { Request, Response } from 'express';
import ClientsRepository from '../repositories/implementations/ClientsRepository';
import ProjectsRepository from '../repositories/implementations/ProjectsRepository';

import ProjectTypesRespository from '../repositories/implementations/ProjectTypesRepository';
import CreateProjectService from '../services/CreateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';
import FindProjectService from '../services/FindProjectService';
import ListProjectsService from '../services/ListProjectsService';

class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { client_id, project_type_id, name } = request.body;

      const projectsRepository = new ProjectsRepository();
      const clientsRepository = new ClientsRepository();
      const projectTypesRepository = new ProjectTypesRespository();

      const createProject = new CreateProjectService(
        projectsRepository,
        clientsRepository,
        projectTypesRepository,
      );

      const project = await createProject.execute({
        client_id,
        project_type_id,
        name,
      });

      return response.json(project);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const projectsRepository = new ProjectsRepository();

      const listProjects = new ListProjectsService(projectsRepository);

      const projects = await listProjects.execute();

      return response.json(projects);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { project_id } = request.params;

      const projectsRepository = new ProjectsRepository();

      const findProject = new FindProjectService(projectsRepository);

      const projects = await findProject.execute(project_id);

      return response.json(projects);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { project_id } = request.params;

      const projectsRepository = new ProjectsRepository();

      const deleteProject = new DeleteProjectService(projectsRepository);

      await deleteProject.execute(project_id);

      return response.json({ success: true });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default ProjectsController;
