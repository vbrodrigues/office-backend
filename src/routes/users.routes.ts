import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.put('/:user_id', usersController.update);
usersRouter.get('/', usersController.show);
usersRouter.get('/:user_id', usersController.index);
usersRouter.delete('/:user_id', usersController.delete);

export default usersRouter;
