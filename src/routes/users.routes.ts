import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.put('/:user_id', usersController.update);

export default usersRouter;
