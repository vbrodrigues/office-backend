import { Request, Response } from 'express';
import ProjectTypesRespository from '../repositories/implementations/ProjectTypesRepository';
import CreateProjectTypeService from '../services/projectTypes/CreateProjectTypeService';

class ProjectTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      const projectTypesRepository = new ProjectTypesRespository();

      const createProjectType = new CreateProjectTypeService(
        projectTypesRepository,
      );

      const projectType = await createProjectType.execute({ name });

      return response.json(projectType);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default ProjectTypesController;
