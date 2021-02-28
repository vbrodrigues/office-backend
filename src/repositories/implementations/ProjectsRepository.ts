import { getRepository, Repository } from 'typeorm';
import ICreateProjectDTO from '../../dtos/ICreateProjectDTO';
import IFindProjectByNameForClientDTO from '../../dtos/IFindProjectByNameForClientDTO';
import Project from '../../models/Project';
import IProjectsRepository from '../interfaces/IProjectsRepository';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async create({
    client_id,
    project_type_id,
    name,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      client_id,
      project_type_id,
      name,
    });

    await this.ormRepository.save(project);

    return project;
  }

  public async findById(project_id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(project_id);
    return project;
  }

  public async findByNameForClient({
    client_id,
    name,
  }: IFindProjectByNameForClientDTO): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: {
        client_id,
        name,
      },
    });

    return project;
  }
}

export default ProjectsRepository;
