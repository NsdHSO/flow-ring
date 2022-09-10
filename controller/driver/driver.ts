import * as express            from 'express';
import {
  Request,
  Response,
}                              from 'express';
import { authenticationToken } from "../../login/login";

const routerDriver = express.Router();

routerDriver.use(authenticationToken)

routerDriver.get( '/', ( req : Request, resp : Response ) => {
  resp.send( "dasdasd" );
} );

export  default  routerDriver;
