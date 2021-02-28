import { getRepository, Repository } from 'typeorm';
import ICreateClientDTO from '../../dtos/ICreateClientDTO';
import Client from '../../models/Client';
import IClientsRepository from '../interfaces/IClientsRepository';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({
    name,
    email,
    phone_number,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name,
      email,
      phone_number,
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async save(client: Client): Promise<void> {
    await this.ormRepository.save(client);
  }

  public async findById(client_id: string): Promise<Client | undefined> {
    const client = this.ormRepository.findOne({
      where: { id: client_id },
    });

    return client;
  }

  public async findByName(name: string): Promise<Client | undefined> {
    const client = this.ormRepository.findOne({ name });

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = this.ormRepository.findOne({ email });

    return client;
  }
}

export default ClientsRepository;
