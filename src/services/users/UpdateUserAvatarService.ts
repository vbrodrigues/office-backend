import User from '../models/User';
import { FileData, IStorageProvider } from '../providers/storage/IStorageProvider';
import IRolesRepository from '../repositories/interfaces/IRolesRepository';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar: FileData;
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    usersRepository: IUsersRepository,
    storageProvider: IStorageProvider
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({
    user_id,
    avatar
  }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    const avatarPath = avatar ? await this.storageProvider.upload(avatar) : null;

    if (avatarPath) {
      user.avatar = avatarPath;
      await this.usersRepository.save(user);
    }


    return user;
  }
}

export default UpdateUserAvatarService;
