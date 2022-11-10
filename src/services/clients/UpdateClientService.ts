import Client from '../models/Client';
import IClientsRepository from '../repositories/interfaces/IClientsRepository';

interface IRequest {
  client_id: string;
  phone_number?: string;
  email?: string;
}

class UpdateClientService {
  private ClientsRepository: IClientsRepository;

  constructor(ClientsRepository: IClientsRepository) {
    this.ClientsRepository = ClientsRepository;
  }

  public async execute({
    client_id,
    phone_number,
    email,
  }: IRequest): Promise<Client | undefined> {
    const client = await this.ClientsRepository.findById(client_id);

    if (!client) {
      throw new Error('Client not found.');
    }
    if (phone_number) {
      client.phone_number = phone_number;
    }

    if (email) {
      client.email = email;
    }

    await this.ClientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
