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
exports.Inbox = void 0;
var typeorm_1 = require("typeorm");
var Inbox = /** @class */ (function () {
    function Inbox() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Inbox.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "newEmail", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "inbox", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "starred", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "send", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "draft", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "spam", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "important", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "bin", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "filterPrimary", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "filterSocial", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "filterWork", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "filterFriends", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Inbox.prototype, "newLabel", void 0);
    Inbox = __decorate([
        (0, typeorm_1.Entity)()
    ], Inbox);
    return Inbox;
}());
exports.Inbox = Inbox;
//# sourceMappingURL=inbox.js.map