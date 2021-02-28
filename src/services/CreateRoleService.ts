import Role from '../models/Role';
import IRolesRepository from '../repositories/interfaces/IRolesRepository';

interface IRequest {
  name: string;
}

class CreateRoleService {
  private rolesRepository: IRolesRepository;

  constructor(rolesRepository: IRolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  public async execute({ name }: IRequest): Promise<Role> {
    const roleAlreadyExists = this.rolesRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new Error('Role already exists.');
    }

    const role = await this.rolesRepository.create({ name });
    return role;
  }
}

export default CreateRoleService;
