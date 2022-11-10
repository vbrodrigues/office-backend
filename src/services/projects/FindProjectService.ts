import Project from '../models/Project';
import IProjectsRepository from '../repositories/interfaces/IProjectsRepository';

class FindProjectsService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute(project_id: string): Promise<Project | undefined> {
    const project = await this.projectsRepository.findById(project_id);

    return project;
  }
}

export default FindProjectsService;
