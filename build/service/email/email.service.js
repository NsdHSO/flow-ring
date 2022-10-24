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
            var total, emails, _i, emails_1, email, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.emailRepository.count()];
                    case 1:
                        total = _b.sent();
                        return [4 /*yield*/, this.emailRepository.createQueryBuilder('email')
                                .innerJoinAndSelect('email.description', 'description')
                                .leftJoinAndSelect('email.messages', 'messages')
                                .leftJoinAndSelect('email.elienSender', 'elien')
                                .take(item)
                                .skip(skip)
                                .getMany()];
                    case 2:
                        emails = _b.sent();
                        _i = 0, emails_1 = emails;
                        _b.label = 3;
                    case 3:
                        if (!(_i < emails_1.length)) return [3 /*break*/, 6];
                        email = emails_1[_i];
                        _a = email;
                        return [4 /*yield*/, this.chatMessageRepository.createQueryBuilder('chat')
                                .where('chat.email = :id', { id: email.id })
                                .leftJoinAndSelect('chat.email', 'email')
                                .getMany()];
                    case 4:
                        _a.messages = _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, {
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
            var email, _a, emailMessages, _loop_1, this_1, _i, _b, chatMessage, _c, _d, emailMessages_1, emailMessageG;
            return __generator(this, function (_e) {
                switch (_e.label) {
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
                        _a.elienSender = _e.sent();
                        emailMessages = Array();
                        if (!(req.body.chatMessages.length > 0)) return [3 /*break*/, 5];
                        _loop_1 = function (chatMessage) {
                            var message;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        message = new chatMessage_1.ChatMessage();
                                        message.description = chatMessage.description;
                                        return [4 /*yield*/, this_1.elienRepository.findOne({ where: { id: chatMessage.senderId } })
                                                .then(function (senderID) {
                                                message.sender = senderID;
                                            })];
                                    case 1:
                                        _f.sent();
                                        return [4 /*yield*/, this_1.elienRepository.findOne({ where: { id: chatMessage.receiverId } })
                                                .then(function (receiveMessageOnPort) {
                                                message.receiver = receiveMessageOnPort;
                                            })];
                                    case 2:
                                        _f.sent();
                                        emailMessages.push(message);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _b = req.body.chatMessages;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        chatMessage = _b[_i];
                        return [5 /*yield**/, _loop_1(chatMessage)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _c = email;
                        return [4 /*yield*/, emailMessages];
                    case 6:
                        _c.messages = _e.sent();
                        return [4 /*yield*/, this.elienRepository.findOne({
                                where: {
                                    name: req.body.name,
                                },
                            })
                                .then(function (elien) {
                                email.elienSender = elien;
                            })];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, this.emailRepository.save(email)];
                    case 8:
                        _e.sent();
                        _d = 0, emailMessages_1 = emailMessages;
                        _e.label = 9;
                    case 9:
                        if (!(_d < emailMessages_1.length)) return [3 /*break*/, 12];
                        emailMessageG = emailMessages_1[_d];
                        emailMessageG.email = email;
                        return [4 /*yield*/, this.chatMessageRepository.save(emailMessageG)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11:
                        _d++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, 'INSERT'];
                }
            });
        });
    };
    EmailProvider.prototype.findById = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return EmailProvider;
}());
exports.EmailProvider = EmailProvider;
//# sourceMappingURL=email.service.js.map