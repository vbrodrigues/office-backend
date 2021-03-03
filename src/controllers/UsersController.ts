import { Request, Response } from 'express';
import RolesRepository from '../repositories/implementations/RolesRepository';
import UsersRepository from '../repositories/implementations/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import DeleteUsersService from '../services/DeleteUserService';
import FindUsersService from '../services/FindUserService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserService from '../services/UpdateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { role, name, email, phone_number } = request.body;

      const usersRepository = new UsersRepository();
      const rolesRepository = new RolesRepository();

      const createUser = new CreateUserService(
        usersRepository,
        rolesRepository,
      );

      const user = await createUser.execute({
        role,
        name,
        email,
        phone_number,
      });

      return response.json(user);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
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
      return response.status(500).json({ error: err });
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
      return response.status(500).json({ error: err });
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
      return response.status(500).json({ error: err });
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
      return response.status(500).json({ error: err });
    }
  }
}

export default UsersController;
