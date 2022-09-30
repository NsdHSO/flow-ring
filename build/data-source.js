"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var dotenv = require("dotenv");
var typeorm_1 = require("typeorm");
dotenv === null || dotenv === void 0 ? void 0 : dotenv.config({ path: './.env' });
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.PGHOST,
    port: 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [
        'entity/*/*/*.ts',
        'entity/*/*/*/*.ts',
        'entity/*/*.ts',
    ],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
    },
});
//# sourceMappingURL=data-source.js.map