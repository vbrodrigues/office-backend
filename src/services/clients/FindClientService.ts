import Client from '../models/Client';
import IClientsRepository from '../repositories/interfaces/IClientsRepository';

class FindClientsService {
  private clientsRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository) {
    this.clientsRepository = clientsRepository;
  }

  public async execute(client_id: string): Promise<Client | undefined> {
    const client = await this.clientsRepository.findById(client_id);

    return client;
  }
}

export default FindClientsService;
