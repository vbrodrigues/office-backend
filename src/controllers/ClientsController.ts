import { Request, Response } from 'express';
import ClientsRepository from '../repositories/implementations/ClientsRepository';
import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';

class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, phone_number } = request.body;

      const clientsRepository = new ClientsRepository();

      const createClient = new CreateClientService(clientsRepository);

      const client = await createClient.execute({
        name,
        email,
        phone_number,
      });

      return response.json(client);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { client_id } = request.params;
      const { phone_number, email } = request.body;

      const clientsRepository = new ClientsRepository();

      const updateClient = new UpdateClientService(clientsRepository);

      const client = await updateClient.execute({
        client_id,
        phone_number,
        email,
      });

      return response.json(client);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default ClientsController;
