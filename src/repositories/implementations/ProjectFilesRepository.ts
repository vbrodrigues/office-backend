import { getRepository, Repository } from 'typeorm';
import ICreateProjectFileDTO from '../../dtos/ICreateProjectFileDTO';
import ProjectFile from '../../models/ProjectFile';
import IProjectFilesRepository from '../interfaces/IProjecFilesRepository';

class ProjectFilesRepository implements IProjectFilesRepository {
  private ormRepository: Repository<ProjectFile>;

  constructor() {
    this.ormRepository = getRepository(ProjectFile);
  }

  public async create({
    project_id,
    path,
  }: ICreateProjectFileDTO): Promise<ProjectFile> {
    const projectFile = this.ormRepository.create({ project_id, path });

    await this.ormRepository.save(projectFile);

    return projectFile;
  }

  public async findById(
    project_file_id: string,
  ): Promise<ProjectFile | undefined> {
    const projectFile = await this.ormRepository.findOne(project_file_id);
    return projectFile;
  }

  public async findByPath(path: string): Promise<ProjectFile | undefined> {
    const projectFile = await this.ormRepository.findOne({ path });
    return projectFile;
  }
}

export default ProjectFilesRepository;
