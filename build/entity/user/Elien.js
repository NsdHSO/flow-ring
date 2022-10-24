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
exports.Elien = void 0;
var typeorm_1 = require("typeorm");
var chatMessage_1 = require("../email/chatMessage");
var permission_1 = require("./permission/permission");
var Elien = /** @class */ (function () {
    function Elien() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Elien.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Elien.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Elien.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Elien.prototype, "label", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Elien.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Elien.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Elien.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Elien.prototype, "icon", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return permission_1.Permission; }, function (permission) { return permission.elien; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", permission_1.Permission)
    ], Elien.prototype, "permission", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return chatMessage_1.ChatMessage; }, function (sender) { return sender.sender; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], Elien.prototype, "sender", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return chatMessage_1.ChatMessage; }, function (rece) { return rece.receiver; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], Elien.prototype, "receiver", void 0);
    Elien = __decorate([
        (0, typeorm_1.Entity)()
    ], Elien);
    return Elien;
}());
exports.Elien = Elien;
//# sourceMappingURL=Elien.js.map