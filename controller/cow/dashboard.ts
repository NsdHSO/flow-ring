import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {DashboardProvider} from '../../service/cow/dashboard.service';

const dashboardRouter = express.Router();
const dashboardProvider = new DashboardProvider();
dashboardRouter.use(authenticationToken);
dashboardRouter.get(
  '/', async (req: Request, response: Response) => {
    if (req) {
      await dashboardProvider.getAllDashboardData()
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
export default dashboardRouter;
