"use strict";
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
var express = require("express");
var login_1 = require("../../login/login");
var email_service_1 = require("../../service/email/email.service");
var emailRouter = express.Router();
var emailProvider = new email_service_1.EmailProvider();
emailRouter.use(login_1.authenticationToken);
emailRouter.get('/search/:payload', function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.params.payload);
                return [4 /*yield*/, emailProvider.findAfterQuery(String(req.params.payload))
                        .then(function (resp) {
                        console.log(resp);
                        response.status(200)
                            .send(resp);
                    })
                        .catch(function (err) {
                        console.log(err);
                        response.status(500)
                            .send('Server error 2');
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
emailRouter.post('/', function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req) return [3 /*break*/, 2];
                return [4 /*yield*/, emailProvider.addedNewEmail(req, response)
                        .then(function (report) {
                        response.status(200)
                            .send(report);
                    })
                        .catch(function (err) {
                        console.log(err);
                        response.status(500)
                            .send('Server error ');
                    })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
emailRouter.get('/:items/:page', function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var item, skip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                item = parseInt(req.params.items, 10);
                skip = parseInt(req.params.page, 10);
                return [4 /*yield*/, emailProvider.getAllEmail(item, skip)
                        .then(function (resp) {
                        response.status(200)
                            .send(resp);
                    })
                        .catch(function (err) {
                        console.error(err);
                        response.status(500)
                            .send('Server error');
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
emailRouter.get('/:id/:item/:skip', function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, emailProvider.findById(parseInt(req.params.item, 10), parseInt(req.params.skip, 10), parseInt(req.params.id, 10))
                    .then(function (resp) {
                    response.status(200)
                        .send(resp);
                })
                    .catch(function (err) {
                    console.error(err);
                    response.status(500)
                        .send('Server error');
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.default = emailRouter;
//# sourceMappingURL=email.js.map