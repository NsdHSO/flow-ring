import * as dotenv                     from 'dotenv';
import * as express                    from 'express';
import {
  Request,
  Response,
}                                      from 'express';
import routerDriver                    from './controller/driver/driver';
import { AppDataSource }               from "./data-source";
import { Driver }                      from "./entity/driver/Driver";
import router, { authenticationToken } from './login/login';

const app = express();
const port = process.env.PORT || 3000;
app.use( express.json() );
dotenv?.config( { path : './.env' } );
AppDataSource.initialize().then( async( resp ) => {
  console.log( "Here you can setup and run express / fastify / any other framework." );
} ).catch( ( err ) => {
  throw new Error( err );
} );
app.use( ( req, resp, next ) => {
  console.log( req.body );
  next();
} );
app.use( router );
app.use( '/driver', routerDriver );
app.get( '/app', authenticationToken, async( req : Request, res : Response ) => {
  let driver = await AppDataSource.getRepository( Driver ).find();
  console.log( req.body.message );
  res.send( driver );

} );
app.listen( port, () => {
  console.log( `⚡️[server]: Server is running at http://localhost:${ port }` );
} );

