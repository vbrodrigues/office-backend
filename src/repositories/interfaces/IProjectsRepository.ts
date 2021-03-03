import ICreateProjectDTO from '../../dtos/ICreateProjectDTO';
import IFindProjectByNameForClientDTO from '../../dtos/IFindProjectByNameForClientDTO';
import Project from '../../models/Project';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  find(): Promise<Project[]>;
  findById(project_id: string): Promise<Project | undefined>;
  findByNameForClient(
    data: IFindProjectByNameForClientDTO,
  ): Promise<Project | undefined>;
  delete(project_id: string): Promise<void>;
}
