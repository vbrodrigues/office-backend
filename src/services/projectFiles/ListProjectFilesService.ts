import ProjectFile from '../models/ProjectFile';
import IProjectFilesRepository from '../repositories/interfaces/IProjectFilesRepository';

class ListProjectFilesService {
  private projectFilesRepository: IProjectFilesRepository;

  constructor(projectFilesRepository: IProjectFilesRepository) {
    this.projectFilesRepository = projectFilesRepository;
  }

  public async execute(): Promise<ProjectFile[]> {
    const projectFiles = await this.projectFilesRepository.find();

    return projectFiles;
  }
}

export default ListProjectFilesService;
