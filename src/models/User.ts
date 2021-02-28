import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Role from './Role';
import Schedule from './Schedule';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Schedule, schedule => schedule.user)
  schedules: Schedule[];

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

export default User;
