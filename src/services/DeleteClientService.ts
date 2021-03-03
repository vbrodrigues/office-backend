import IClientsRepository from '../repositories/interfaces/IClientsRepository';

class DeleteclientsService {
  private clientsRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository) {
    this.clientsRepository = clientsRepository;
  }

  public async execute(client_id: string): Promise<void> {
    await this.clientsRepository.delete(client_id);
  }
}

export default DeleteclientsService;
