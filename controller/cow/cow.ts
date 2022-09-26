import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {CowMeatProvider} from '../../service/cow/cow.service';

const cowRouter = express.Router();
const cowMeatProvider = new CowMeatProvider();
cowRouter.use(authenticationToken);
cowRouter.get(
  '/',
  async (req: Request, resp: Response) => {
    await cowMeatProvider.getAllCows(req, resp)
      .then(cows => resp.status(200)
        .send(cows))
      .catch(err =>
        resp.status(500)
          .send(err));
  },
);
export default cowRouter;
