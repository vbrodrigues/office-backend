import { Request, Response } from 'express';
import ProjectFilesRepository from '../repositories/implementations/ProjectFilesRepository';
import ProjectsRepository from '../repositories/implementations/ProjectsRepository';
import CreateProjectFileService from '../services/CreateProjectFile';
import DeleteProjectFileService from '../services/DeleteProjectFileService';
import FindProjectFileService from '../services/FindProjectFileService';
import ListProjectFilesService from '../services/ListProjectFilesService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const projectFilesRepository = new ProjectFilesRepository();

      const listProjectFiles = new ListProjectFilesService(
        projectFilesRepository,
      );

      const projectFiles = await listProjectFiles.execute();

      return response.json(projectFiles);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { project_file_id } = request.params;

      const projectFilesRepository = new ProjectFilesRepository();

      const findProjectFile = new FindProjectFileService(
        projectFilesRepository,
      );

      const projectFile = await findProjectFile.execute(project_file_id);

      return response.json(projectFile);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { project_file_id } = request.params;

      const projectFilesRepository = new ProjectFilesRepository();

      const deleteProjectFile = new DeleteProjectFileService(
        projectFilesRepository,
      );

      await deleteProjectFile.execute(project_file_id);

      return response.json({ success: true });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default ProjectFilesController;
