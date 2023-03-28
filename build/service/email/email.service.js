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
exports.EmailProvider = void 0;
var typeorm_1 = require("typeorm");
var data_source_1 = require("../../data-source");
var chatMessage_1 = require("../../entity/email/chatMessage");
var email_1 = require("../../entity/email/email");
var Elien_1 = require("../../entity/user/Elien");
var EmailProvider = /** @class */ (function () {
    function EmailProvider() {
        this.emailRepository = data_source_1.AppDataSource.getRepository(email_1.Email);
        this.elienRepository = data_source_1.AppDataSource.getRepository(Elien_1.Elien);
        this.chatMessageRepository = data_source_1.AppDataSource.getRepository(chatMessage_1.ChatMessage);
    }
    EmailProvider.prototype.getAllEmail = function (item, skip) {
        if (item === void 0) { item = 10; }
        if (skip === void 0) { skip = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var total, emails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailRepository.count()];
                    case 1:
                        total = _a.sent();
                        return [4 /*yield*/, this.emailRepository.createQueryBuilder('email')
                                .innerJoinAndSelect('email.description', 'description')
                                .leftJoinAndSelect('email.elienSender', 'elien')
                                .take(item)
                                .skip(skip)
                                .getMany()];
                    case 2:
                        emails = _a.sent();
                        return [2 /*return*/, {
                                emails: emails,
                                total: total,
                            }];
                }
            });
        });
    };
    EmailProvider.prototype.findAfterQuery = function (query) {
        if (query === void 0) { query = 'test'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.emailRepository.createQueryBuilder('email')
                        .innerJoinAndSelect('email.description', 'description')
                        .leftJoinAndSelect('email.elien', 'elien')
                        .where({ title: (0, typeorm_1.ILike)("%".concat(String(query), "%")) })
                        .getMany()];
            });
        });
    };
    EmailProvider.prototype.addedNewEmail = function (req, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, _a, emailMessages, _loop_1, this_1, _i, _b, chatMessage, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        email = new email_1.Email();
                        email.title = req.body.title;
                        email.label = req.body.label;
                        email.visible = true;
                        email.typeOfPeople = '';
                        email.vote = false;
                        email.timestamp = new Date();
                        email.description = req.body.description;
                        switch (req.body.lable) {
                            case 'Primary':
                                email.label = 0;
                                break;
                            case 'Work':
                                email.label = 1;
                                break;
                            case 'Friend':
                                email.label = 2;
                                break;
                            default:
                                email.label = 3;
                                break;
                        }
                        _a = email;
                        return [4 /*yield*/, this.elienRepository.findOne({ where: { id: req.body.elienId } })];
                    case 1:
                        _a.elienSender = _d.sent();
                        email.timestamp = new Date();
                        emailMessages = Array();
                        if (!(req.body.chatMessages.length > 0)) return [3 /*break*/, 5];
                        _loop_1 = function (chatMessage) {
                            var message;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        message = new chatMessage_1.ChatMessage();
                                        message.description = chatMessage.description;
                                        return [4 /*yield*/, this_1.elienRepository.findOne({ where: { id: chatMessage.senderId } })
                                                .then(function (senderID) {
                                                message.sender = senderID;
                                            })];
                                    case 1:
                                        _e.sent();
                                        message.timestamp = new Date();
                                        return [4 /*yield*/, this_1.elienRepository.findOne({ where: { id: chatMessage.receiverId } })
                                                .then(function (receiveMessageOnPort) {
                                                message.receiver = receiveMessageOnPort;
                                            })];
                                    case 2:
                                        _e.sent();
                                        emailMessages.push(message);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _b = req.body.chatMessages;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        chatMessage = _b[_i];
                        return [5 /*yield**/, _loop_1(chatMessage)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _c = email;
                        return [4 /*yield*/, emailMessages];
                    case 6:
                        _c.messages = _d.sent();
                        return [4 /*yield*/, this.searchSenderAndSetOnEmail(req, email)];
                    case 7:
                        _d.sent();
                        return [4 /*yield*/, this.emailRepository.save(email)];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, this._setEmailAndSave(emailMessages, email)];
                    case 9:
                        _d.sent();
                        return [2 /*return*/, 'INSERT'];
                }
            });
        });
    };
    EmailProvider.prototype.findById = function (item, skip, id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var email, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.emailRepository.createQueryBuilder('email')
                            .where('email.id =:id', { id: id })
                            .getOne()];
                    case 1:
                        email = _e.sent();
                        if (skip === 0) {
                            skip = 1;
                        }
                        _c = email;
                        return [4 /*yield*/, this.chatMessageRepository.createQueryBuilder('chat')
                                .where({ email: email })
                                .leftJoinAndSelect('chat.receiver', 'receiver')
                                .leftJoinAndSelect('chat.sender', 'sender')
                                .offset(item * skip)
                                .limit(item)
                                .getMany()];
                    case 2:
                        _c.messages = _e.sent();
                        _d = {
                            email: email
                        };
                        return [4 /*yield*/, ((_a = email.messages[0]) === null || _a === void 0 ? void 0 : _a.sender)];
                    case 3:
                        _d.sender = _e.sent();
                        return [4 /*yield*/, ((_b = email.messages[0]) === null || _b === void 0 ? void 0 : _b.receiver)];
                    case 4: return [2 /*return*/, (_d.receiver = _e.sent(),
                            _d)];
                }
            });
        });
    };
    EmailProvider.prototype.searchSenderAndSetOnEmail = function (req, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elienRepository.findOne({
                            where: {
                                name: req.body.name,
                            },
                        })
                            .then(function (elien) {
                            email.elienSender = elien;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailProvider.prototype._setEmailAndSave = function (emailMessages, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, emailMessages_1, emailMessageG;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, emailMessages_1 = emailMessages;
                        _a.label = 1;
                    case 1:
                        if (!(_i < emailMessages_1.length)) return [3 /*break*/, 4];
                        emailMessageG = emailMessages_1[_i];
                        emailMessageG.email = email;
                        return [4 /*yield*/, this.chatMessageRepository.save(emailMessageG)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return EmailProvider;
}());
exports.EmailProvider = EmailProvider;
//# sourceMappingURL=email.service.js.map