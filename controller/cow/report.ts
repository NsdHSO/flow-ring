import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {ReportProvider} from '../../service/cow/report.service';

const reportingRouter = express.Router();
const reportProvider = new ReportProvider();
reportingRouter.use(authenticationToken);
reportingRouter.post(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await reportProvider.addedNewStateOfReport(req, response)
        .then(report => {
          response.status(200)
            .send(report);
        });
    }
  });
export default reportingRouter;
