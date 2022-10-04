import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {ToDoProvider} from '../../service/to-do/toDo.service';

const toDoRouter = express.Router();
const toDoProvider = new ToDoProvider();
toDoRouter.use(authenticationToken);
toDoRouter.post(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await toDoProvider.addedNewToDo(req)
        .then(report => {
          response.status(200)
            .send(report);
        })
        .catch(err => {
          response.status(500)
            .send('Server error ');
        });
    }
  });
toDoRouter.get(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await toDoProvider.getAllToDo()
        .then(report => {
          response.status(200)
            .send(report);
        })
        .catch(err => {
          response.status(500)
            .send('Server error ');
        });
    }
  });
toDoRouter.patch(
  '/:id', async (req: Request, response: Response) => {
    if (req) {
      await toDoProvider.update(req)
        .then(report => {
          response.status(200)
            .send(report);
        })
        .catch(err => {
          response.status(500)
            .send('Server error ');
        });
    }
  });

toDoRouter.delete(
  '/:id', async (req: Request, response: Response) => {
    if (req) {
      await toDoProvider.delete(req)
        .then(report => {
          response.status(200)
            .send(report);
        })
        .catch(err => {
          response.status(500)
            .send('Server error ');
        });
    }
  });
export default toDoRouter;
