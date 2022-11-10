import IProjectsRepository from '../repositories/interfaces/IProjectsRepository';

class DeleteProjectsService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute(project_id: string): Promise<void> {
    await this.projectsRepository.delete(project_id);
  }
}

export default DeleteProjectsService;
