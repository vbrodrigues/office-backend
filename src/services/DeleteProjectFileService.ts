import IProjectFilesRepository from '../repositories/interfaces/IProjectFilesRepository';

class DeleteProjectFilesService {
  private projectFilesRepository: IProjectFilesRepository;

  constructor(projectFilesRepository: IProjectFilesRepository) {
    this.projectFilesRepository = projectFilesRepository;
  }

  public async execute(project_file_id: string): Promise<void> {
    await this.projectFilesRepository.delete(project_file_id);
  }
}

export default DeleteProjectFilesService;
