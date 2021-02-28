import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Client from './Client';
import ProjectType from './ProjectType';

@Entity('projects')
class Project {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  project_type_id: string;

  @ManyToOne(() => ProjectType)
  @JoinColumn({ name: 'project_type_id' })
  projectType: ProjectType;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Project;
