import User from '../models/User';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

class DeleteUsersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(user_id: string): Promise<void> {
    await this.usersRepository.delete(user_id);
  }
}

export default DeleteUsersService;
