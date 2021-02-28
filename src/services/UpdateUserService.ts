import User from '../models/User';
import IRolesRepository from '../repositories/interfaces/IRolesRepository';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
  user_id: string;
  role?: string;
  phone_number?: string;
  email?: string;
}

class UpdateUserService {
  private usersRepository: IUsersRepository;

  private rolesRepository: IRolesRepository;

  constructor(
    usersRepository: IUsersRepository,
    rolesRepository: IRolesRepository,
  ) {
    this.usersRepository = usersRepository;
    this.rolesRepository = rolesRepository;
  }

  public async execute({
    user_id,
    role,
    phone_number,
    email,
  }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    if (role) {
      const roleExists = await this.rolesRepository.findByName(role);

      if (!roleExists) {
        throw new Error('Role not found.');
      }

      user.role_id = roleExists.id;
      user.role = roleExists;
    }

    if (phone_number) {
      user.phone_number = phone_number;
    }

    if (email) {
      user.email = email;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
