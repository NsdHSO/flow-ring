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
exports.Permission = void 0;
var typeorm_1 = require("typeorm");
var Elien_1 = require("../Elien");
var inbox_1 = require("./inbox");
var Permission = /** @class */ (function () {
    function Permission() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Permission.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return inbox_1.Inbox; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", inbox_1.Inbox)
    ], Permission.prototype, "inbox", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Elien_1.Elien; }, function (elien) { return elien.permission; }),
        __metadata("design:type", Array)
    ], Permission.prototype, "elien", void 0);
    Permission = __decorate([
        (0, typeorm_1.Entity)()
    ], Permission);
    return Permission;
}());
exports.Permission = Permission;
//# sourceMappingURL=permission.js.map