import Project from '../models/Project';
import IProjectsRepository from '../repositories/interfaces/IProjectsRepository';

class ListProjectsService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.find();

    return projects;
  }
}

export default ListProjectsService;
