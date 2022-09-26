import * as dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import {MeatCow} from './entity/cow/meatCow';
import {Driver} from './entity/driver/Driver';
import {Location} from './entity/driver/Location';
import {Elien} from './entity/user/Elien';

dotenv?.config({path: './.env'});
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [
    Driver, Elien, Location, MeatCow,
  ],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});
