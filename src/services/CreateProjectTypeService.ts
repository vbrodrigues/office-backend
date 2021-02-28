import ProjectType from '../models/ProjectType';
import IProjectTypesRepository from '../repositories/interfaces/IProjectTypesRepository';

interface IRequest {
  name: string;
}

class CreateProjectTypeService {
  private projectTypesRepository: IProjectTypesRepository;

  constructor(projectTypesRepository: IProjectTypesRepository) {
    this.projectTypesRepository = projectTypesRepository;
  }

  public async execute({ name }: IRequest): Promise<ProjectType> {
    const projectTypeAlreadyExists = await this.projectTypesRepository.findByName(
      name,
    );

    if (projectTypeAlreadyExists) {
      throw new Error('Project type already exists.');
    }

    const projectType = await this.projectTypesRepository.create({ name });
    return projectType;
  }
}

export default CreateProjectTypeService;
