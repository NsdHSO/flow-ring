"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var Driver_1 = require("./entity/driver/Driver");
var Location_1 = require("./entity/driver/Location");
var Elien_1 = require("./entity/user/Elien");
var dotenv = require("dotenv");
dotenv === null || dotenv === void 0 ? void 0 : dotenv.config({ path: './.env' });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [Driver_1.Driver, Elien_1.Elien, Location_1.Location],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map