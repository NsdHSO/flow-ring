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
exports.ActionEmail = void 0;
var typeorm_1 = require("typeorm");
var inbox_1 = require("./inbox");
var ActionEmail = /** @class */ (function () {
    function ActionEmail() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ActionEmail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "newEmail", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "inbox", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "starred", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "send", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "draft", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "spam", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "important", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ActionEmail.prototype, "bin", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return inbox_1.Inbox; }, function (inbox) { return inbox.filterLabel; }),
        __metadata("design:type", Array)
    ], ActionEmail.prototype, "inboxes", void 0);
    ActionEmail = __decorate([
        (0, typeorm_1.Entity)()
    ], ActionEmail);
    return ActionEmail;
}());
exports.ActionEmail = ActionEmail;
//# sourceMappingURL=actionEmail.js.map