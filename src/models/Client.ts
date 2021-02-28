import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('clients')
class Client {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Client;
