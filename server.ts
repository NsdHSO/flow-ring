import * as cors from 'cors';
import * as dotenv from 'dotenv';
import type {Request, Response} from 'express';
import * as express from 'express';
import cowRouter from './controller/cow/cow';
import graphRouter from './controller/cow/graph';
import cowMilkRouter from './controller/cow/milkCow';
import reportingRouter from './controller/cow/report';
import routerDriver from './controller/driver/driver';
import toDoRouter from './controller/to-do/toDo';
import {AppDataSource} from './data-source';
import router, {authenticationToken} from './login/login';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
dotenv?.config({path: './.env'});
AppDataSource.initialize()
  .then(async resp => {
    console.log('Here you can setup and run express / fastify / any other framework.');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });
app.use((req, resp, next) => {
  console.log(req.body);
  next();
});
app.use(router);
app.use('/driver', routerDriver);
app.use('/cow/meat', cowRouter);
app.use('/cow/milk', cowMilkRouter);
app.use('/cow/milk/reporting', reportingRouter);
app.use('/cow/milk/graph', graphRouter);
app.use('/to-do', toDoRouter);
app.get('/app', authenticationToken, async (req: Request, res: Response) => {
  console.log(req.body.message);
});
app.get('', (reqest: Request, response: Response) => {
  response.status(200)
    .send('Please feel free to contribute here https://github.com/Vorkurt/flow-ring');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

