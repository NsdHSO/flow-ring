import { DataSource } from "typeorm";
import { Driver }     from "./entity/driver/Driver";
import { Location }   from "./entity/driver/Location";
import { Elien }      from "./entity/user/Elien";
import * as dotenv    from 'dotenv';
dotenv?.config( { path : './.env' } );

export  const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: +process.env.PGPORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [Driver, Elien, Location],
  migrations: [],
  subscribers: [],
})
