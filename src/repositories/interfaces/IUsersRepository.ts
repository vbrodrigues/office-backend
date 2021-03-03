import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../models/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<void>;
  find(): Promise<User[]>;
  findById(user_id: string): Promise<User | undefined>;
  findByName(name: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(user_id: string): Promise<void>;
}
