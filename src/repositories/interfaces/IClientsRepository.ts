import ICreateClientDTO from '../../dtos/ICreateClientDTO';
import Client from '../../models/Client';

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  save(client: Client): Promise<void>;
  findById(client_id: string): Promise<Client | undefined>;
  findByName(name: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
}
