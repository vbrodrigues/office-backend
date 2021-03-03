import ICreateProjectFileDTO from '../../dtos/ICreateProjectFileDTO';
import ProjectFile from '../../models/ProjectFile';

export default interface IProjectFilesRepository {
  create(data: ICreateProjectFileDTO): Promise<ProjectFile>;
  find(): Promise<ProjectFile[]>;
  findById(project_file_id: string): Promise<ProjectFile | undefined>;
  findByPath(path: string): Promise<ProjectFile | undefined>;
  delete(project_file_id: string): Promise<void>;
}
