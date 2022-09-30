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
exports.NumberInsemination = void 0;
var typeorm_1 = require("typeorm");
var milkCow_1 = require("./milkCow");
var NumberInsemination = /** @class */ (function () {
    function NumberInsemination() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], NumberInsemination.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], NumberInsemination.prototype, "lact", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], NumberInsemination.prototype, "insemination", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return milkCow_1.MilkCow; }, function (milkCow) { return milkCow.numberIn; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Object)
    ], NumberInsemination.prototype, "milkCowNumber", void 0);
    NumberInsemination = __decorate([
        (0, typeorm_1.Entity)()
    ], NumberInsemination);
    return NumberInsemination;
}());
exports.NumberInsemination = NumberInsemination;
//# sourceMappingURL=numberInsemination.js.map