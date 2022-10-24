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
exports.Email = void 0;
var typeorm_1 = require("typeorm");
var Elien_1 = require("../user/Elien");
var chatMessage_1 = require("./chatMessage");
var message_1 = require("./message");
var Email = /** @class */ (function () {
    function Email() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Email.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Email.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('boolean'),
        __metadata("design:type", Boolean)
    ], Email.prototype, "vote", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Email.prototype, "label", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Email.prototype, "typeOfPeople", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
        __metadata("design:type", Date)
    ], Email.prototype, "timestamp", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
        __metadata("design:type", Boolean)
    ], Email.prototype, "visible", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return message_1.Message; }, { cascade: true, onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", message_1.Message)
    ], Email.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Elien_1.Elien; }, function (elien) { return elien.email; }, { cascade: true, onDelete: 'CASCADE' }),
        __metadata("design:type", Elien_1.Elien)
    ], Email.prototype, "elienSender", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return chatMessage_1.ChatMessage; }, function (rece) { return rece.receiver; }, { cascade: ['insert', 'update'] }),
        __metadata("design:type", Array)
    ], Email.prototype, "messages", void 0);
    Email = __decorate([
        (0, typeorm_1.Entity)()
    ], Email);
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=email.js.map