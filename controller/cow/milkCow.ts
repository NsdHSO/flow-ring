import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {CowMilkProvider} from '../../service/cow/cow-milk.service';

const cowMilkRouter = express.Router();
const cowMilkProvider = new CowMilkProvider();
cowMilkRouter.use(authenticationToken);
cowMilkRouter.get('/:items/:page', async (req: Request, response: Response) => {
  await cowMilkProvider.getAllCows(req, response)
    .then(cows => response.status(200)
      .send(cows))
    .catch(err =>
      response.status(500)
        .send(err));
});
cowMilkRouter.post('/', async (req: Request, response: Response) => {
  await cowMilkProvider.insertNewCow(req, response)
    .then(cows => response.status(200)
      .send(cows))
    .catch(err => {
      response.status(500)
        .send(err);
    },
    );
});
cowMilkRouter.put('/:id', async (req: Request, response: Response) => {
  await cowMilkProvider.modifiedOneCow(req, response);
});
cowMilkRouter.delete('/:id', async (request: Request, response: Response) => {
  await cowMilkProvider.deleteCow(request, response);
});

cowMilkRouter.get('/:items/:page/download', async (req, resp) => {
  await cowMilkProvider.downloadData(req, resp);
});
export default cowMilkRouter;
