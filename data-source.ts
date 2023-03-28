import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

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
    'entity/*/*/*.{ts,js}',
    'entity/*/*/*/*.{ts,js}',
    'entity/*/*.{ts,js}',
    'entity/*.{ts,js}',
  ],
  migrations: [],
  subscribers: []
});
