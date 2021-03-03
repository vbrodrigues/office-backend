import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../models/User';
import IUsersRepository from '../interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    role_id,
    name,
    email,
    phone_number,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      role_id,
      name,
      email,
      phone_number,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async find(): Promise<User[]> {
    const users = await this.ormRepository.find({ relations: ['role'] });
    return users;
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      relations: ['role'],
      where: { id: user_id },
    });

    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ name });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ email });

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository.delete({ id: user_id });
  }
}

export default UsersRepository;
