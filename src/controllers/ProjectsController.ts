import { Request, Response } from 'express';
import ClientsRepository from '../repositories/implementations/ClientsRepository';
import ProjectsRepository from '../repositories/implementations/ProjectsRepository';
import ProjectTypesRespository from '../repositories/implementations/ProjectTypesRepository';
import CreateProjectService from '../services/CreateProjectService';

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
}

export default ProjectsController;
