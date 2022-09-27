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
exports.CowMeatProvider = void 0;
var data_source_1 = require("../../data-source");
var meatCow_1 = require("../../entity/cow/meatCow");
var CowMeatProvider = /** @class */ (function () {
    function CowMeatProvider() {
        this.cowMeatRepository = data_source_1.AppDataSource.getRepository(meatCow_1.MeatCow);
    }
    CowMeatProvider.prototype.getAllCows = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cowMeatRepository.createQueryBuilder('cow')
                        .getMany()];
            });
        });
    };
    CowMeatProvider.prototype.addedCow = function (req, response) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var cow;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        cow = new meatCow_1.MeatCow();
                        cow.howMuchEats = (_a = req.body.howMuchEats) !== null && _a !== void 0 ? _a : 0;
                        cow.numberOfLiveCattle = (_b = req.body.numberOfLiveCattle) !== null && _b !== void 0 ? _b : 0;
                        cow.age = (_c = req.body.age) !== null && _c !== void 0 ? _c : 0;
                        cow.birth = (_d = req.body.birth) !== null && _d !== void 0 ? _d : 0;
                        return [4 /*yield*/, this.cowMeatRepository.createQueryBuilder('cow')
                                .where('cow.number = :number', { number: req.body.number })
                                .getOne()
                                .then(function (resp) {
                                if (resp !== null) {
                                    console.log(resp);
                                    response.status(400)
                                        .send('Duplicate ');
                                    throw new Error('Duplicate');
                                }
                                else {
                                    if (req.body.number !== undefined) {
                                        cow.number = req.body.number;
                                    }
                                    else {
                                        response.status(400)
                                            .send('Not number of cow');
                                    }
                                    throw new Error('Not number ');
                                }
                            })];
                    case 1:
                        _f.sent();
                        cow.kg = (_e = req.body.kg) !== null && _e !== void 0 ? _e : 0;
                        return [2 /*return*/, this.cowMeatRepository.save(cow)];
                }
            });
        });
    };
    CowMeatProvider.prototype.modifiedOneCow = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cowMeatRepository.findOne({
                            where: {
                                id: parseInt(request.params.id, 10),
                            },
                        })
                            .then(function (cow) {
                            cow[Object.keys(request.body)[0].split(':')[0]] = Object.values(request.body)[0];
                            void _this.cowMeatRepository.save(cow)
                                .then(function (cow) {
                                if (cow) {
                                    return response.status(200)
                                        .send(cow);
                                }
                                response.status(404)
                                    .send('Not found!');
                            });
                        })
                            .catch(function (err) {
                            response.status(500)
                                .send('Not found ');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CowMeatProvider.prototype.deleteCow = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cowMeatRepository.createQueryBuilder()
                            .delete()
                            .from(meatCow_1.MeatCow)
                            .where('id = :id', { id: request.params.id })
                            .execute()
                            .then(function (resp) { return response.status(200)
                            .send(resp); })
                            .catch(function (err) { return response.status(500)
                            .send(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CowMeatProvider;
}());
exports.CowMeatProvider = CowMeatProvider;
//# sourceMappingURL=cow.service.js.map