"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationToken = void 0;
var bcrypt = __importStar(require("bcrypt"));
var jwt = __importStar(require("jsonwebtoken"));
var data_source_1 = require("../data-source");
var Elien_1 = require("../entity/user/Elien");
var permission_1 = require("../entity/user/permission/permission");
var express = require('express');
var router = express.Router();
router.get('/elien', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var elien;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Elien_1.Elien)
                    .find()];
            case 1:
                elien = _a.sent();
                res.status(200)
                    .send(elien);
                return [2 /*return*/];
        }
    });
}); });
router.post('/elien', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedKeyGenPassw, elienLocal, elien, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (req.body.password.length < 7) {
                    return [2 /*return*/, res.send('Password to short')];
                }
                return [4 /*yield*/, bcrypt.hash(req.body.password, 13)];
            case 1:
                hashedKeyGenPassw = _a.sent();
                elienLocal = {
                    name: req.body.name,
                    password: hashedKeyGenPassw,
                };
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Elien_1.Elien)
                        .create(elienLocal)];
            case 2:
                elien = _a.sent();
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Elien_1.Elien)
                        .save(elien)];
            case 3:
                _a.sent();
                res.status(201)
                    .send('User created');
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500)
                    .send(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/elien/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var eliens, elien, accessToken, elienDAO, permissionDAO, permission, _a, _b, e_2;
    var _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 10, , 11]);
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Elien_1.Elien)
                        .find()];
            case 1:
                eliens = _f.sent();
                elien = eliens.find(function (res) { return res.name === req.body.name; });
                accessToken = jwt.sign({ elien: elien }, process.env.ACCESS_TOKEN_SECRET);
                elien.token = accessToken !== null && accessToken !== void 0 ? accessToken : accessToken;
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Elien_1.Elien)
                        .createQueryBuilder('elien')
                        .leftJoinAndSelect('elien.permission', 'permission')
                        .where({ id: elien.id })
                        .getOne()];
            case 2:
                elienDAO = _f.sent();
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(permission_1.Permission)
                        .createQueryBuilder('permission')
                        .where({ id: elienDAO.permission.id })
                        .leftJoinAndSelect('permission.inbox', 'inbox')
                        .leftJoinAndSelect('inbox.actionEmail', 'action')
                        .leftJoinAndSelect('inbox.filterLabel', 'filterLabel')
                        .getOne()];
            case 3:
                permissionDAO = _f.sent();
                permission = permissionDAO;
                return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Elien_1.Elien)
                        .save(elienDAO)];
            case 4:
                _f.sent();
                return [4 /*yield*/, bcrypt.compare(req.body.password, elien.password)];
            case 5:
                if (!_f.sent()) return [3 /*break*/, 8];
                _b = (_a = res).send;
                _c = {
                    message: 'Success'
                };
                _d = {};
                _e = {};
                return [4 /*yield*/, permission.inbox.actionEmail];
            case 6:
                _e.actions = _f.sent();
                return [4 /*yield*/, permission.inbox.filterLabel];
            case 7:
                _b.apply(_a, [(_c.permission = (_d.inbox = (_e.label = _f.sent(),
                        _e),
                        _d),
                        _c.token = accessToken,
                        _c)]);
                return [3 /*break*/, 9];
            case 8:
                res.send('Not allowed');
                _f.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                e_2 = _f.sent();
                console.log(e_2);
                res.status(500)
                    .send('Dont have allowed ');
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
function authenticationToken(req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, user) {
        if (error) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
exports.authenticationToken = authenticationToken;
exports.default = router;
//# sourceMappingURL=login.js.map