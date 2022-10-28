import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {ChatMessageProvider} from '../../service/email/chat-message.service';

const chatMessageRouter = express.Router();
const chatMessageProvider = new ChatMessageProvider();
chatMessageRouter.use(authenticationToken);
chatMessageRouter.put(
  '/:id', async (req: Request, response: Response) => {
    if (req) {
      await chatMessageProvider.addedNewMessage(req)
        .then(report => {
          response.status(200)
            .send(report);
        })
        .catch(err => {
          console.log(err);
          response.status(500)
            .send('Server error ');
        });
    }
  });
chatMessageRouter.get(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await chatMessageProvider.getAllToDo()
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
chatMessageRouter.patch(
  '/:id', async (req: Request, response: Response) => {
    if (req) {
      await chatMessageProvider.update(req)
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
chatMessageRouter.delete(
  '/:id', async (req: Request, response: Response) => {
    if (req) {
      await chatMessageProvider.delete(req)
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
export default chatMessageRouter;
