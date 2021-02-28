import { getRepository, LessThanOrEqual, Repository } from 'typeorm';
import ICreateScheduleDTO from '../../dtos/ICreateScheduleDTO';
import IFindAllSchedulesBeforeDateForProjectDTO from '../../dtos/IFindAllSchedulesBeforeDateForProjectDTO';
import Schedule from '../../models/Schedule';
import ISchedulesRepository from '../interfaces/ISchedulesRepository';

class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async create({
    project_id,
    user_id,
    start_date,
    end_date,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = this.ormRepository.create({
      project_id,
      user_id,
      start_date,
      end_date,
    });

    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async findById(schedule_id: string): Promise<Schedule | undefined> {
    const schedule = await this.ormRepository.findOne(schedule_id);
    return schedule;
  }

  public async findAllForProject(project_id: string): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: { project_id },
      order: { end_date: 'ASC' },
    });
    return schedules;
  }

  public async findAllBeforeDateForProject({
    project_id,
    end_date,
  }: IFindAllSchedulesBeforeDateForProjectDTO): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: {
        project_id,
        end_date: LessThanOrEqual(end_date),
      },
      order: { end_date: 'ASC' },
    });

    return schedules;
  }
}

export default SchedulesRepository;
