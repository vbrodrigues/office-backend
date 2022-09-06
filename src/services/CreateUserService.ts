import User from '../models/User';
import { FileData, IStorageProvider } from '../providers/storage/IStorageProvider';
import IRolesRepository from '../repositories/interfaces/IRolesRepository';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
  role: string;
  name: string;
  email: string;
  phone_number: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  private rolesRepository: IRolesRepository;

  constructor(
    usersRepository: IUsersRepository,
    rolesRepository: IRolesRepository
  ) {
    this.usersRepository = usersRepository;
    this.rolesRepository = rolesRepository;
  }

  public async execute({
    role,
    name,
    email,
    phone_number
  }: IRequest): Promise<User> {
    const foundRole = await this.rolesRepository.findByName(role);

    if (!foundRole) {
      throw new Error('Role was not found.');
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error('E-mail already in use.');
    }

    const user = await this.usersRepository.create({
      role_id: foundRole.id,
      name,
      email,
      phone_number
    });
    return user;
  }
}

export default CreateUserService;
