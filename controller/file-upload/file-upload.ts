import type {Request, Response} from 'express';
import * as express from 'express';
import {authenticationToken} from '../../login/login';
import {FileUploadProvider} from '../../service/file-upload/file-upload.service';

type MulterRequest = {
  file: any;
} & Request;

const fileUploadRouter = express.Router();
const fileUploadProvider = new FileUploadProvider();
fileUploadRouter.use(authenticationToken);
fileUploadRouter.post(
  '/', async (req: MulterRequest, response: Response) => {
    console.log(req.file);
    if (req) {
      await fileUploadProvider.addedNewStateOfReport(req, 'dasdas')
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
export default fileUploadRouter;
