import ProjectFile from '../models/ProjectFile';
import IProjectFilesRepository from '../repositories/interfaces/IProjectFilesRepository';

class FindProjectFilesService {
  private projectFilesRepository: IProjectFilesRepository;

  constructor(projectFilesRepository: IProjectFilesRepository) {
    this.projectFilesRepository = projectFilesRepository;
  }

  public async execute(
    project_file_id: string,
  ): Promise<ProjectFile | undefined> {
    const projectFile = await this.projectFilesRepository.findById(
      project_file_id,
    );

    return projectFile;
  }
}

export default FindProjectFilesService;
