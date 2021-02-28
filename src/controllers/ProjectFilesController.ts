import { Request, Response } from 'express';
import ProjectFilesRepository from '../repositories/implementations/ProjectFilesRepository';
import ProjectsRepository from '../repositories/implementations/ProjectsRepository';
import CreateProjectFileService from '../services/CreateProjectFile';

class ProjectFilesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { project_id, path } = request.body;

      const projectFilesRepository = new ProjectFilesRepository();
      const projectsRepository = new ProjectsRepository();

      const createProjectFile = new CreateProjectFileService(
        projectFilesRepository,
        projectsRepository,
      );

      const projectFile = await createProjectFile.execute({ project_id, path });

      return response.json(projectFile);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default ProjectFilesController;
