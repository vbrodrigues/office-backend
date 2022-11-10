import { Request, Response } from 'express';
import { LocalStorage } from '../providers/storage/LocalStorage';
import RolesRepository from '../repositories/implementations/RolesRepository';
import UsersRepository from '../repositories/implementations/UsersRepository';
import CreateUserService from '../services/users/CreateUserService';
import DeleteUsersService from '../services/users/DeleteUserService';
import FindUsersService from '../services/users/FindUserService';
import ListUsersService from '../services/users/ListUsersService';
import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService';
import UpdateUserService from '../services/users/UpdateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { role, name, email, phone_number } = request.body;

      const usersRepository = new UsersRepository();
      const rolesRepository = new RolesRepository();

      const createUser = new CreateUserService(
        usersRepository,
        rolesRepository
      );

      const user = await createUser.execute({
        role,
        name,
        email,
        phone_number
      });

      return response.json(user);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }

  public async updateAvatar(request: Request, response: Response): Promise<Response> {
    try {

      const { user_id } = request.params;

      if (!request.file) {
        return response.status(400).json({ error: 'Please, provide a file.' })
      }

      const avatarData = {
        content: request.file.buffer,
        filename: request.file.originalname
      }

      const usersRepository = new UsersRepository();
      const localStorage = new LocalStorage();

      const updateUserAvatar = new UpdateUserAvatarService(usersRepository, localStorage);

      await updateUserAvatar.execute({user_id, avatar: avatarData})

      return response.status(200).json({ success: true })


    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }

  public async downloadAvatar(request: Request, response: Response): Promise<Response> {
    try {

      const { user_id } = request.params;

      const usersRepository = new UsersRepository();

      const findUser = new FindUsersService(usersRepository);

      const user = await findUser.execute(user_id);

      if (user?.avatar) {
        response.download(user?.avatar)
      } else {
        return response.status(500).json({ error: 'User does not have a valid avatar.' });
      }

    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;
      const { role, phone_number, email } = request.body;

      const usersRepository = new UsersRepository();
      const rolesRepository = new RolesRepository();

      const updateUser = new UpdateUserService(
        usersRepository,
        rolesRepository,
      );

      const user = await updateUser.execute({
        user_id,
        role,
        phone_number,
        email,
      });

      return response.json(user);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const usersRepository = new UsersRepository();

      const listUsers = new ListUsersService(usersRepository);

      const users = await listUsers.execute();

      return response.json(users);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;

      const usersRepository = new UsersRepository();

      const findUser = new FindUsersService(usersRepository);

      const users = await findUser.execute(user_id);

      return response.json(users);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;

      const usersRepository = new UsersRepository();

      const deleteUser = new DeleteUsersService(usersRepository);

      await deleteUser.execute(user_id);

      return response.json({ success: true });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: String(err) });
    }
  }
}

export default UsersController;
