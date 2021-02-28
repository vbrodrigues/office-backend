import Client from '../models/Client';
import IClientsRepository from '../repositories/interfaces/IClientsRepository';

interface IRequest {
  name: string;
  email: string;
  phone_number: string;
}

class CreateClientService {
  private clientsRepository: IClientsRepository;

  constructor(ClientsRepository: IClientsRepository) {
    this.clientsRepository = ClientsRepository;
  }

  public async execute({
    name,
    email,
    phone_number,
  }: IRequest): Promise<Client> {
    const emailAlreadyExists = await this.clientsRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error('E-mail already in use.');
    }

    const client = await this.clientsRepository.create({
      name,
      email,
      phone_number,
    });
    return client;
  }
}

export default CreateClientService;
