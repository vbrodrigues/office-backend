import { getRepository, Repository } from 'typeorm';
import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import Role from '../../models/Role';
import IRolesRepository from '../interfaces/IRolesRepository';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async create({ name }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({ name });

    await this.ormRepository.save(role);

    return role;
  }

  public async findById(role_id: string): Promise<Role | undefined> {
    const role = this.ormRepository.findOne(role_id);
    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = this.ormRepository.findOne({ name });

    return role;
  }
}

export default RolesRepository;
