import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {EmailProvider} from '../../service/email/email.service';

const emailRouter = express.Router();
const emailProvider = new EmailProvider();
emailRouter.use(authenticationToken);
emailRouter.get('/search/:payload', async (req: Request, response: Response) => {
  console.log(req.params.payload);
  await emailProvider.findAfterQuery(String(req.params.payload))
    .then(resp => {
      console.log(resp);
      response.status(200)
        .send(resp);
    })
    .catch(err => {
      console.log(err);
      response.status(500)
        .send('Server error 2');
    });
});
emailRouter.post(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await emailProvider.addedNewEmail(req, response)
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
emailRouter.get('/:items/:page', async (req: Request, response: Response) => {
  const item = parseInt(req.params.items, 10);
  const skip = parseInt(req.params.page, 10);
  await emailProvider.getAllEmail(item, skip)
    .then(resp => {
      response.status(200)
        .send(resp);
    })
    .catch(err => {
      console.error(err);
      response.status(500)
        .send('Server error');
    });
});
emailRouter.get('/:id/:item/:skip', async (req: Request, response: Response) => {
  await emailProvider.findById(parseInt(req.params.item, 10),parseInt(req.params.skip, 10),parseInt(req.params.id, 10))
    .then(resp => {
      response.status(200)
        .send(resp);
    })
    .catch(err => {
      console.error(err);
      response.status(500)
        .send('Server error');
    });
});
export default emailRouter;
