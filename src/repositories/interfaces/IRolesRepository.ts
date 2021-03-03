import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import Role from '../../models/Role';

export default interface IRolesRepository {
  create(date: ICreateRoleDTO): Promise<Role>;
  find(): Promise<Role[]>;
  findById(role_id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
}
