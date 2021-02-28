import { Request, Response } from 'express';
import RolesRepository from '../repositories/implementations/RolesRepository';
import CreateRoleService from '../services/CreateRoleService';

class RolesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      const rolesRepository = new RolesRepository();

      const createRole = new CreateRoleService(rolesRepository);

      const role = await createRole.execute({ name });

      return response.json(role);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default RolesController;
