import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.post('/', clientsController.create);
clientsRouter.put('/:client_id', clientsController.update);
clientsRouter.get('/', clientsController.show);
clientsRouter.get('/:client_id', clientsController.index);
clientsRouter.delete('/:client_id', clientsController.delete);

export default clientsRouter;
