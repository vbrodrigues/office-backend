import ProjectFile from '../models/ProjectFile';
import IProjectFilesRepository from '../repositories/interfaces/IProjecFilesRepository';
import IProjectsRepository from '../repositories/interfaces/IProjectsRepository';

interface IRequest {
  project_id: string;
  path: string;
}

class CreateProjectFileService {
  private projectFilesRepository: IProjectFilesRepository;

  private projectsRepository: IProjectsRepository;

  constructor(
    projectFilesRepository: IProjectFilesRepository,
    projectsRepository: IProjectsRepository,
  ) {
    this.projectFilesRepository = projectFilesRepository;
    this.projectsRepository = projectsRepository;
  }

  public async execute({ project_id, path }: IRequest): Promise<ProjectFile> {
    const projectExists = await this.projectsRepository.findById(project_id);

    if (!projectExists) {
      throw new Error('Project not found.');
    }

    const projectFile = await this.projectFilesRepository.create({
      project_id,
      path,
    });

    return projectFile;
  }
}

export default CreateProjectFileService;
