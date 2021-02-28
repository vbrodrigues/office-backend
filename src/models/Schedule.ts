import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Project from './Project';
import User from './User';

@Entity('schedules')
class Schedule {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  project_id: string;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

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

export default Schedule;
