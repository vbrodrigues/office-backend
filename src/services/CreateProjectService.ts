import Project from '../models/Project';
import IClientsRepository from '../repositories/interfaces/IClientsRepository';
import IProjectsRepository from '../repositories/interfaces/IProjectsRepository';
import IProjectTypesRepository from '../repositories/interfaces/IProjectTypesRepository';

interface IRequest {
  client_id: string;
  project_type_id: string;
  name: string;
}

class CreateProjectService {
  private projectsRepository: IProjectsRepository;

  private clientsRepository: IClientsRepository;

  private projectTypesRepository: IProjectTypesRepository;

  constructor(
    projectsRepository: IProjectsRepository,
    clientsRepository: IClientsRepository,
    projectTypesRepository: IProjectTypesRepository,
  ) {
    this.projectsRepository = projectsRepository;
    this.clientsRepository = clientsRepository;
    this.projectTypesRepository = projectTypesRepository;
  }

  public async execute({
    client_id,
    project_type_id,
    name,
  }: IRequest): Promise<Project> {
    const clientExists = await this.clientsRepository.findById(client_id);

    if (!clientExists) {
      throw new Error('Client not found.');
    }

    const projectTypeExists = await this.projectTypesRepository.findById(
      project_type_id,
    );

    if (!projectTypeExists) {
      throw new Error('Project type not found.');
    }

    const projectAlreadyExists = await this.projectsRepository.findByNameForClient(
      {
        client_id,
        name,
      },
    );

    if (projectAlreadyExists) {
      throw new Error('Project already exists for client.');
    }

    const project = await this.projectsRepository.create({
      client_id,
      project_type_id,
      name,
    });

    return project;
  }
}

export default CreateProjectService;
