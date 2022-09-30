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
exports.CowMilkProvider = void 0;
var data_source_1 = require("../../data-source");
var milkCow_1 = require("../../entity/cow/milk/milkCow");
var numberInsemination_1 = require("../../entity/cow/milk/numberInsemination");
var CowMilkProvider = /** @class */ (function () {
    function CowMilkProvider() {
        this.cowMilkRepository = data_source_1.AppDataSource.getRepository(milkCow_1.MilkCow);
    }
    CowMilkProvider.prototype.getAllCows = function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var item, skip;
            return __generator(this, function (_a) {
                if (req.params.page === undefined || req.params.items === undefined) {
                    return [2 /*return*/, resp.status(400)
                            .send('Bad Request')];
                }
                item = parseInt(req.params.items, 10);
                skip = parseInt(req.params.page, 10);
                console.log(item, skip);
                return [2 /*return*/, this.cowMilkRepository.createQueryBuilder('cow')
                        .leftJoinAndSelect('cow.numberIn', 'numberIn')
                        .take(item)
                        .skip(skip)
                        .getMany()];
            });
        });
    };
    CowMilkProvider.prototype.insertNewCow = function (req, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cow = new milkCow_1.MilkCow();
                        cow.birth = req.body.birth;
                        cow.kg = req.body.kg;
                        cow.howMuchEats = req.body.howMuchEats;
                        cow.numberOfLiveCattle = req.body.numberOfLiveCattle;
                        cow.age = req.body.age;
                        cow.state = req.body.state;
                        cow.group = req.body.group;
                        cow.gynecologicalStatus = req.body.gynecologicalStatus;
                        cow.ageMonth = req.body.ageMonth;
                        cow.averageOfMilk = req.body.averageOfMilk;
                        cow.cowInHeat = req.body.cowInHeat;
                        cow.numberIn = new numberInsemination_1.NumberInsemination();
                        cow.numberIn.lact = req.body.numberIn.lact;
                        cow.numberIn.insemination = req.body.numberIn.insemination;
                        return [4 /*yield*/, this.cowMilkRepository.createQueryBuilder('cow')
                                .where('cow.number = :number', { number: req.body.number })
                                .getOne()
                                .then(function (resp) {
                                if (resp !== null) {
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
                                        throw new Error('Not number of cow');
                                    }
                                    throw new Error('Not number ');
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cowMilkRepository.save(cow)
                                .then(function (re) { return response.status(200)
                                .send(re); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CowMilkProvider;
}());
exports.CowMilkProvider = CowMilkProvider;
//# sourceMappingURL=cow-milk.service.js.map