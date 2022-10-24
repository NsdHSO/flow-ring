"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
var typeorm_1 = require("typeorm");
var Elien_1 = require("../user/Elien");
var email_1 = require("./email");
var ChatMessage = /** @class */ (function () {
    function ChatMessage() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ChatMessage.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ChatMessage.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Elien_1.Elien; }, function (elien) { return elien.sender; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Elien_1.Elien)
    ], ChatMessage.prototype, "sender", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Elien_1.Elien; }, function (elien) { return elien.receiver; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Elien_1.Elien)
    ], ChatMessage.prototype, "receiver", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return email_1.Email; }, function (elien) { return elien.messages; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", email_1.Email)
    ], ChatMessage.prototype, "email", void 0);
    ChatMessage = __decorate([
        (0, typeorm_1.Entity)()
    ], ChatMessage);
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=chatMessage.js.map