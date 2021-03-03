import { getRepository, Repository } from 'typeorm';
import ICreateProjectFileDTO from '../../dtos/ICreateProjectFileDTO';
import ProjectFile from '../../models/ProjectFile';
import IProjectFilesRepository from '../interfaces/IProjectFilesRepository';

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

  public async find(): Promise<ProjectFile[]> {
    const projectFiles = await this.ormRepository.find({
      relations: ['project', 'project.client', 'project.projectType'],
    });
    return projectFiles;
  }

  public async findById(
    project_file_id: string,
  ): Promise<ProjectFile | undefined> {
    const projectFile = await this.ormRepository.findOne({
      where: { id: project_file_id },
      relations: ['project'],
    });
    return projectFile;
  }

  public async findByPath(path: string): Promise<ProjectFile | undefined> {
    const projectFile = await this.ormRepository.findOne({
      where: { path },
      relations: ['project'],
    });
    return projectFile;
  }

  public async delete(project_file_id: string): Promise<void> {
    await this.ormRepository.delete({ id: project_file_id });
  }
}

export default ProjectFilesRepository;
