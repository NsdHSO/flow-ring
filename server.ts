import * as dotenv from 'dotenv';
import * as express from 'express';
import type {
  Request,
  Response,
} from 'express';
import routerDriver from './controller/driver/driver';
import {AppDataSource} from './data-source';
import router, {authenticationToken} from './login/login';
import * as cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
dotenv?.config({path: './.env'});

AppDataSource.initialize().then(async resp => {
  console.log('Here you can setup and run express / fastify / any other framework.');
}).catch(err => {
  console.error('Error during Data Source initialization:', err);
});

app.use(cors());

app.use((req, resp, next) => {
  console.log(req.body);
  next();
});
app.use(router);
app.use('/driver', routerDriver);
app.get('/app', authenticationToken, async (req: Request, res: Response) => {
  console.log(req.body.message);
});
app.get('', (reqest: Request, response: Response) => {
  response.status(200).send('Please feel free to contribute here https://github.com/Vorkurt/flow-ring');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

