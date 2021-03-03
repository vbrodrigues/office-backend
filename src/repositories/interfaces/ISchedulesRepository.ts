import ICreateScheduleDTO from '../../dtos/ICreateScheduleDTO';
import IFindAllSchedulesBeforeDateForProjectDTO from '../../dtos/IFindAllSchedulesBeforeDateForProjectDTO';
import Schedule from '../../models/Schedule';

export default interface ISchedulesRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  find(): Promise<Schedule[]>;
  findById(schedule_id: string): Promise<Schedule | undefined>;
  findAllForProject(project_id: string): Promise<Schedule[]>;
  findAllBeforeDateForProject(
    data: IFindAllSchedulesBeforeDateForProjectDTO,
  ): Promise<Schedule[]>;
}
