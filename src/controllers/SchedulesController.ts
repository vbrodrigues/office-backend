import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import ProjectsRepository from '../repositories/implementations/ProjectsRepository';
import SchedulesRepository from '../repositories/implementations/SchedulesRepository';
import UsersRepository from '../repositories/implementations/UsersRepository';
import CreateScheduleService from '../services/CreateScheduleService';

class SchedulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { project_id, user_id, start_date, end_date } = request.body;

      const schedulesRepository = new SchedulesRepository();
      const projectsRepository = new ProjectsRepository();
      const usersRepository = new UsersRepository();

      const createSchedule = new CreateScheduleService(
        schedulesRepository,
        projectsRepository,
        usersRepository,
      );

      const parsedStartDate = parseISO(start_date);
      const parsedEndDate = parseISO(end_date);

      const schedule = await createSchedule.execute({
        project_id,
        user_id,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
      });

      return response.json(schedule);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  }
}

export default SchedulesController;
