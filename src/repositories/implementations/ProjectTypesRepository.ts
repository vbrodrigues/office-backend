import { getRepository, Repository } from 'typeorm';
import ICreateProjectTypeDTO from '../../dtos/ICreateProjectTypeDTO';
import ProjectType from '../../models/ProjectType';
import IProjectTypesRepository from '../interfaces/IProjectTypesRepository';

class ProjectTypesRespository implements IProjectTypesRepository {
  private ormRepository: Repository<ProjectType>;

  constructor() {
    this.ormRepository = getRepository(ProjectType);
  }

  public async create({ name }: ICreateProjectTypeDTO): Promise<ProjectType> {
    const projectType = this.ormRepository.create({ name });

    await this.ormRepository.save(projectType);

    return projectType;
  }

  public async find(): Promise<ProjectType[]> {
    const projectTypes = await this.ormRepository.find();
    return projectTypes;
  }

  public async findById(
    project_type_id: string,
  ): Promise<ProjectType | undefined> {
    const projectType = await this.ormRepository.findOne(project_type_id);
    return projectType;
  }

  public async findByName(name: string): Promise<ProjectType | undefined> {
    const projectType = this.ormRepository.findOne({ name });
    return projectType;
  }
}

export default ProjectTypesRespository;
