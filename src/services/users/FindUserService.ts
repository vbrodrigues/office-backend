import User from '../models/User';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

class FindUsersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(user_id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    return user;
  }
}

export default FindUsersService;
