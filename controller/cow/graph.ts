import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {GraphProvider} from '../../service/cow/graph.service';

const graphRouter = express.Router();
const graphProvider = new GraphProvider();
graphRouter.use(authenticationToken);
graphRouter.post(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await graphProvider.addedNewStateOfGraph(req, response)
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
export default graphRouter;
