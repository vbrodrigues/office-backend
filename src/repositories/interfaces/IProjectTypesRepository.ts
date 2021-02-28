import ICreateProjectTypeDTO from '../../dtos/ICreateProjectTypeDTO';
import ProjectType from '../../models/ProjectType';

export default interface IProjectTypesRepository {
  create(data: ICreateProjectTypeDTO): Promise<ProjectType>;
  findById(project_type_id: string): Promise<ProjecType | undefined>;
  findByName(name: string): Promise<ProjectType | undefined>;
}
