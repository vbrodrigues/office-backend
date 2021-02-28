import { format, isBefore, isValid } from 'date-fns';
import Schedule from '../models/Schedule';
import IProjectsRepository from '../repositories/interfaces/IProjectsRepository';
import ISchedulesRepository from '../repositories/interfaces/ISchedulesRepository';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
  project_id: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
}

class CreateScheduleService {
  private schedulesRepository: ISchedulesRepository;

  private projectsRepository: IProjectsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    schedulesRepository: ISchedulesRepository,
    projectsRepository: IProjectsRepository,
    usersRepository: IUsersRepository,
  ) {
    this.schedulesRepository = schedulesRepository;
    this.projectsRepository = projectsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({
    project_id,
    user_id,
    start_date,
    end_date,
  }: IRequest): Promise<Schedule> {
    const projectExists = await this.projectsRepository.findById(project_id);

    if (!projectExists) {
      throw new Error('Project not found.');
    }

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error('User not found.');
    }

    if (!isValid(start_date)) {
      throw new Error('Invalid start date.');
    }

    if (!isValid(end_date)) {
      throw new Error('Invalid end date.');
    }

    if (isBefore(start_date, Date.now())) {
      throw new Error('Start date cannot be on past date.');
    }

    if (isBefore(end_date, Date.now())) {
      throw new Error('End date cannot be on past date.');
    }

    const formattedStartDate = format(start_date, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = format(end_date, 'yyyy-MM-dd HH:mm:ss');

    const schedule = await this.schedulesRepository.create({
      project_id,
      user_id,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });

    return schedule;
  }
}

export default CreateScheduleService;
