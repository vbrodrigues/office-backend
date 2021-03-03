import Client from '../models/Client';
import IClientsRepository from '../repositories/interfaces/IClientsRepository';

class ListClientsService {
  private clientsRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository) {
    this.clientsRepository = clientsRepository;
  }

  public async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.find();

    return clients;
  }
}

export default ListClientsService;
