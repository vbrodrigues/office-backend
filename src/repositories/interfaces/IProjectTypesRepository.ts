import ICreateProjectTypeDTO from '../../dtos/ICreateProjectTypeDTO';
import ProjectType from '../../models/ProjectType';

export default interface IProjectTypesRepository {
  create(data: ICreateProjectTypeDTO): Promise<ProjectType>;
  find(): Promise<ProjectType[]>;
  findById(project_type_id: string): Promise<ProjectType | undefined>;
  findByName(name: string): Promise<ProjectType | undefined>;
}
