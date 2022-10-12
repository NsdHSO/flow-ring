import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {EmailProvider} from '../../service/email/email.service';

const emailRouter = express.Router();
const emailProvider = new EmailProvider();
emailRouter.use(authenticationToken);
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
emailRouter.get('/', async (req: Request, response: Response) => {
  await emailProvider.getAllReport()
    .then(resp => {
      response.status(200)
        .send(resp);
    })
    .catch(err => {
      response.status(500)
        .send('Server error ');
    });
});
export default emailRouter;
