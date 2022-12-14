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
exports.Driver = void 0;
var typeorm_1 = require("typeorm");
var Location_1 = require("./Location");
var Driver = /** @class */ (function () {
    function Driver() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Driver.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Driver.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Driver.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)('boolean'),
        __metadata("design:type", Boolean)
    ], Driver.prototype, "license", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Driver.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Driver.prototype, "dataOfBirth", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Driver.prototype, "classOfDriver", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Location_1.Location; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Location_1.Location)
    ], Driver.prototype, "location", void 0);
    Driver = __decorate([
        (0, typeorm_1.Entity)()
    ], Driver);
    return Driver;
}());
exports.Driver = Driver;
//# sourceMappingURL=Driver.js.map